import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, readdir } from 'node:fs/promises';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import { transform } from 'esbuild';
import { parse as parseVue, compileTemplate } from '@vue/compiler-sfc';
import { compile as compileSvelte } from 'svelte/compiler';

const html = await readFile(new URL('../index.html', import.meta.url));
const source = html.toString('utf8');
assert.match(source, /function sanitizeMarkup/);
assert.match(source, /function validateProjectData/);
assert.doesNotMatch(source, /\beval\s*\(/, 'application source must not use eval');
assert.doesNotMatch(source, /new\s+Function\s*\(/, 'application source must not construct dynamic functions');
assert.doesNotMatch(source, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/);
assert.doesNotMatch(source, /AKIA[0-9A-Z]{16}/);
assert.doesNotMatch(source, /gh[pousr]_[A-Za-z0-9_]{20,}/);
const foundEmails = source.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
assert.ok(foundEmails.every(address => address.toLowerCase().endsWith('@example.com')), 'only reserved example.com placeholder addresses may appear in app source');
const server = createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    res.end(html);
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});
await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
const temp = await mkdtemp(join(tmpdir(), 'devsections-smoke-'));
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
  await page.waitForFunction(() => window.DEVSECTIONS_STUDIO_VERSION === '2.2.0');

  const audit = await page.evaluate(() => ({
    ...window.DEVSECTIONS_TEMPLATE_AUDIT,
    allIds: TEMPLATES.map(t => t.id),
    validRoots: TEMPLATES.filter(t => {
      const parsed = new DOMParser().parseFromString(t.html, 'text/html');
      return parsed.body.children.length === 1 && parsed.body.firstElementChild?.tagName === 'SECTION';
    }).length,
    structuralPatterns: CATEGORIES.slice(1).map(([id]) => ({
      id,
      count: new Set(TEMPLATES.filter(t => t.cat === id).map(t => t.name.split(' · ')[0])).size
    }))
  }));
  if (audit.total !== 750) console.error('Catalogue diagnostic:', await page.evaluate(() => ({version:window.DEVSECTIONS_STUDIO_VERSION,count:window.DEVSECTIONS_TEMPLATE_COUNT,categories:CATEGORIES.length})), errors);
  assert.equal(audit.total, 750, 'catalogue should contain 750 designs');
  assert.equal(audit.categories.length, 15, 'catalogue should contain 15 categories');
  assert.equal(new Set(audit.allIds).size, 750, 'all template IDs should be globally unique');
  assert.equal(audit.validRoots, 750, 'all template variants should have one valid section root');
  for (const structure of audit.structuralPatterns) {
    assert.equal(structure.count, 10, structure.id + ' should have ten distinct structural compositions');
  }
  for (const category of audit.categories) {
    assert.equal(category.count, 50, category.id + ' should contain 50 designs');
    assert.equal(category.uniqueIds, 50, category.id + ' should have unique template IDs');
  }

  const initialCards = await page.locator('#templateList .template-card').count();
  assert.equal(initialCards, 24, 'library should render one page of 24 cards, not all 750');
  assert.match(await page.locator('.library-pagination').innerText(), /Page 1 of 32/);
  await page.locator('.library-pagination button').last().click();
  assert.equal(await page.locator('#templateList .template-card').count(), 24);
  assert.match(await page.locator('.library-pagination').innerText(), /Page 2 of 32/);

  const heroCategory = page.locator('#categoryList .cat-btn').filter({ hasText: 'Hero sections' });
  await heroCategory.click();
  assert.equal(await page.locator('#templateList .template-card').count(), 24);
  assert.match(await page.locator('.library-pagination').innerText(), /Page 1 of 3/);

  await page.locator('button[data-panel="brand"]').click();
  await page.locator('#brandHex').fill('#ff0000');
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()), '#ff0000');
  assert.ok(await page.locator('#brandLivePreview .ds').count(), 'brand preview should render a real section');

  await page.locator('button.device').filter({ hasText: 'Mobile' }).click();
  assert.ok(await page.locator('#canvas.mobile').count(), 'mobile preview mode should activate');
  await page.locator('button.device').filter({ hasText: 'Desktop' }).click();

  await page.locator('button[data-panel="library"]').click();
  await page.locator('#categoryList .cat-btn').filter({ hasText: 'Hero sections' }).click();
  await page.locator('#templateList .template-card').first().locator('button.add').click();
  assert.equal(await page.locator('#canvas .canvas-section').count(), 1, 'template should add to canvas');

  const hostileProject = {
    format: 'devsections-studio',
    name: 'Security test',
    pageId: 'page-test',
    brand: { brand: '#6257e8', accent: '#16a394', ink: '#172033', surface: '#ffffff', font: 'Arial,sans-serif', radius: '14px' },
    pages: [{
      id: 'page-test', name: 'Security test', title: 'Security test page', slug: 'index',
      sections: [{
        id: 'section-test', templateId: 'hero-1', name: 'Imported section',
        html: '<section class="ds"><h1>Safe text</h1><img src="https://example.com/a.jpg" onerror="window.__devsectionsPwned=1"><script>window.__devsectionsPwned=2</script><a href="javascript:window.__devsectionsPwned=3">bad link</a><iframe src="https://example.com"></iframe><div style="background-image:url(https://attacker.invalid/track)">unsafe CSS</div></section>'
      }]
    }]
  };
  await page.locator('#projectImport').setInputFiles({
    name: 'hostile-project.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(hostileProject))
  });
  await page.waitForFunction(() => document.querySelector('#canvas h1')?.textContent === 'Safe text');
  assert.equal(await page.locator('#canvas script, #canvas iframe, #canvas [onerror]').count(), 0, 'dangerous markup should be removed');
  assert.equal(await page.locator('#canvas a[href^="javascript:"]').count(), 0, 'javascript URLs should be removed');
  assert.equal(await page.locator('#canvas [style*="url("]').count(), 0, 'remote CSS URL loads should be removed');
  assert.equal(await page.evaluate(() => window.__devsectionsPwned), undefined, 'imported payload must not execute');

  for (const format of ['html', 'react', 'next', 'vue', 'svelte']) {
    await page.locator('#exportFormat').selectOption(format);
    const downloadPromise = page.waitForEvent('download');
    await page.locator('button.primary').click();
    const download = await downloadPromise;
    const path = join(temp, format + '.zip');
    await download.saveAs(path);
    const result = execFileSync('unzip', ['-t', path], { encoding: 'utf8' });
    assert.match(result, /No errors detected/);
    if (format !== 'html') {
      const outputDir = join(temp, format + '-source');
      await mkdir(outputDir, { recursive: true });
      execFileSync('unzip', ['-q', path, '-d', outputDir]);
      const packageJson = JSON.parse(await readFile(join(outputDir, 'package.json'), 'utf8'));
      assert.ok(packageJson.dependencies || packageJson.devDependencies, format + ' package manifest should declare dependencies');
      const walk = async dir => {
        const entries = await readdir(dir, { withFileTypes: true });
        const found = [];
        for (const entry of entries) {
          const full = join(dir, entry.name);
          if (entry.isDirectory()) found.push(...await walk(full));
          else found.push(full);
        }
        return found;
      };
      const generated = await walk(outputDir);
      if (format === 'react' || format === 'next') {
        const jsxFiles = generated.filter(file => file.endsWith('.jsx'));
        assert.ok(jsxFiles.length, format + ' export should contain JSX files');
        for (const file of jsxFiles) await transform(await readFile(file, 'utf8'), { loader: 'jsx', target: 'es2022' });
      } else if (format === 'vue') {
        const file = generated.find(file => file.endsWith('.vue'));
        assert.ok(file, 'Vue export should contain an SFC');
        const source = await readFile(file, 'utf8');
        const parsed = parseVue(source, { filename: file });
        assert.deepEqual(parsed.errors, [], 'Vue SFC should parse');
        const compiled = compileTemplate({ source: parsed.descriptor.template.content, filename: file, id: 'devsections-vue-smoke' });
        assert.deepEqual(compiled.errors, [], 'Vue template should compile');
        if (parsed.descriptor.scriptSetup) await transform(parsed.descriptor.scriptSetup.content, { loader: 'js', target: 'es2022' });
      } else if (format === 'svelte') {
        const files = generated.filter(file => file.endsWith('.svelte'));
        assert.ok(files.length, 'Svelte export should contain route components');
        for (const file of files) compileSvelte(await readFile(file, 'utf8'), { filename: file, generate: 'client' });
      }
    }
  }

  await page.reload({ waitUntil: 'load' });
  await page.waitForFunction(() => window.DEVSECTIONS_STUDIO_VERSION === '2.2.0');
  assert.equal(await page.locator('#canvas .canvas-section').count(), 1, 'saved project should reload');
  assert.deepEqual(errors, [], 'browser should have no uncaught page errors');
  console.log('PASS: 750-template catalogue, pagination, brand preview, responsive mode, template insertion, malicious import sanitisation, five ZIP exports, local save/reload, and browser runtime.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await rm(temp, { recursive: true, force: true });
}
