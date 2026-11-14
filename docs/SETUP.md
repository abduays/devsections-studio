# Repository setup

## Contents

- `index.html`: standalone DevSections Studio 2.2 application and GitHub Pages entry point.
- `README.md`: product overview, usage and deployment instructions.
- `tests/browser-smoke.mjs`: Chromium regression and security smoke tests.
- `docs/`: release notes, test report and setup guidance.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.
- `.github/workflows/quality.yml`: browser quality and security workflow.
- `CONTRIBUTING.md`: contribution expectations.
- `SECURITY.md`: vulnerability reporting and security boundaries.
- `LICENSE`: MIT licence for original project materials, subject to its terms.

## Run the editor

Open `index.html` in a current browser or serve the repository root with a static file server. The application itself does not need Node.js, a package manager, a build step, environment variables or a backend.

## Run browser regression tests locally

Install Node.js 22 or later, then:

~~~bash
npm install --no-save --no-package-lock playwright@1.56.1 esbuild @vue/compiler-sfc svelte
npx playwright install chromium
node tests/browser-smoke.mjs
~~~

The tests start a local static server, launch Chromium, exercise editor features, import a hostile test project and verify all five export ZIP archives.

## GitHub Pages deployment

1. Open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main` or manually run the Pages workflow.
4. Confirm the deployment workflow completes successfully.

## Quality workflow

The quality workflow runs on pushes to the development branch and on pull requests targeting `main`. It uses a temporary Playwright installation in GitHub Actions; this does not add runtime dependencies to the editor.

## Important

The application is a standalone browser app. Browser-local projects are not encrypted or synced. Export project JSON backups before clearing browser data or changing devices.
