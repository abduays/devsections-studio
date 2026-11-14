# DevSections Studio

**A free, local-first visual website builder for people who want design freedom and portable code.**

Build pages from a curated section library, establish a consistent visual identity, and export the result into a project you control.

[Open the live app](https://abduays.github.io/devsections-studio/) · [Report a bug](https://github.com/abduays/devsections-studio/issues/new) · [Request a feature](https://github.com/abduays/devsections-studio/issues/new)

![Deployment](https://github.com/abduays/devsections-studio/actions/workflows/pages.yml/badge.svg) ![Quality checks](https://github.com/abduays/devsections-studio/actions/workflows/quality.yml/badge.svg)

---

## Why DevSections Studio?

Website builders often make a trade-off: quick visual editing in a hosted platform, or complete control through code. DevSections Studio aims to make the middle ground practical.

It is a standalone browser application with a visual editing workflow, a reusable section catalogue, brand-aware previews and source-code export. Projects are designed to stay in the user's browser until the user chooses to export them.

**The project is free to use.** It does not require an account, subscription, paid API, backend service or build tool to open the editor.

> **Project status:** Version 2.2 release candidate. Automated source and export checks have been recorded, but comprehensive cross-browser and production framework-build verification is still outstanding. See the [test report](docs/TEST-REPORT.md).

## Product capabilities

**Catalogue size:** 750 design variants, with 50 entries in each of the 15 section categories. Each category combines six base composition patterns with ten visual treatments and five layout treatments. These are curated combinations of structural patterns and design systems, not 750 independently hand-coded wireframes.

| Area | Included |
|---|---|
| Section library | 750 section designs across 15 categories (50 per category) |
| Website starters | 10 multi-page starter kits |
| Brand system | Shared colour, typography and corner-style settings |
| Brand preview | Preview brand settings against actual template designs |
| Visual editing | Edit supported text and visual elements directly in the canvas |
| Responsive workflow | Desktop, tablet and mobile preview with supported section-level controls |
| Page management | Work with multiple pages in a project |
| Media references | Replace image URLs and keep a local image-reference shelf |
| Quality checks | Basic SEO and accessibility checks |
| Project portability | Import and export project JSON |
| Website export | Static HTML ZIP |
| Framework starters | React + Vite, Next.js, Vue + Vite and SvelteKit |
| Runtime dependencies | No external JavaScript package is required to launch the editor |

### How the 750-design catalogue is organised

Each of the 15 categories contains ten distinct structural compositions, each offered in five visual themes. The compositions use a set of five layout treatments (balanced, centred, narrow editorial, wide canvas and framed panel). This gives 50 selectable designs per category. The catalogue is generated from reusable composition functions, not 750 separately hand-coded page components.

### What it is not

DevSections Studio is not currently a hosted website platform or a complete replacement for a production CMS. It does not provide cloud collaboration, user accounts, a database, managed hosting, payment processing, ecommerce checkout, email delivery or form submission services. Template forms are presentation examples until connected to a service.

Responsive controls are limited to the controls implemented in the editor; this is not unrestricted per-element breakpoint styling. The media shelf stores references, not uploaded or hosted image binaries. SEO and accessibility checks are preliminary checks, not a substitute for a full technical audit or WCAG conformance assessment.

## Get started

### Option 1: Use the hosted editor

Open the [DevSections Studio web app](https://abduays.github.io/devsections-studio/).

GitHub Pages deployment must be enabled for the link to work. If the site is unavailable, see [Deployment and troubleshooting](#deployment-and-troubleshooting).

### Option 2: Run locally

The editor is a standalone HTML application. No Node.js, package manager, bundler or environment variables are needed.

1. Download [index.html](index.html) from this repository.
2. Open it in a current version of Chrome, Edge or Firefox.
3. Create a project and export a JSON backup when you want to preserve or transfer it.

For a local development checkout:

~~~bash
git clone https://github.com/abduays/devsections-studio.git
cd devsections-studio
~~~

Then open index.html in your browser. Alternatively, serve the repository root with any static file server. A local HTTP server is useful when testing browser behaviour that differs between file URLs and HTTP origins.

## Typical workflow

1. **Choose a starting point.** Browse the section catalogue or load a complete website starter.
2. **Establish the brand.** Set the core colours, typography and corner treatment, then inspect the actual template preview.
3. **Build the page.** Add, select, edit and reorder sections.
4. **Check responsive layouts.** Inspect desktop, tablet and mobile previews and adjust the supported layout controls.
5. **Review quality.** Run the built-in preliminary SEO and accessibility checks.
6. **Export.** Save a project JSON backup or generate a static HTML or framework starter project.
7. **Finish the implementation.** Replace sample content and verify links, images, forms, metadata and responsive behaviour before publishing.

## Export options

| Export | Intended use | Follow-up work |
|---|---|---|
| Static HTML ZIP | A portable static website | Review output, replace sample content and deploy to a static host |
| React + Vite | A React project starting point | Install dependencies, inspect components and run a production build |
| Next.js | A Next.js starting point | Install dependencies, review routing and rendering, then build |
| Vue + Vite | A Vue project starting point | Install dependencies, inspect generated components and build |
| SvelteKit | A SvelteKit starting point | Install dependencies, review routes and adapters, then build |
| Project JSON | Backup or transfer an editable builder project | Import it into DevSections Studio |

Framework exports are starter scaffolds, not certified production applications. Review generated code and dependencies, run the framework's build and tests, and apply the security controls appropriate to your deployment. Do not render untrusted HTML or inject untrusted content without sanitisation.

## How the project is structured

The current editor is intentionally distributed as a single-file browser application:

~~~text
devsections-studio/
├── index.html                    # Application: markup, styles and browser logic
├── README.md                     # Product and developer documentation
├── CONTRIBUTING.md               # Contribution workflow and expectations
├── SECURITY.md                   # Security reporting guidance
├── LICENCE-DECISION.md           # Licence status and decision record
├── .gitignore
├── .github/
│   └── workflows/
│       └── pages.yml             # GitHub Pages deployment
└── docs/
    ├── SETUP.md
    ├── RELEASE-NOTES.md
    └── TEST-REPORT.md
~~~

There is currently no application package manifest or compile step. The editor runs in the browser; project data is stored locally by the application. The export generators produce separate project scaffolds for the selected target framework.

This structure keeps the entry path simple and makes it possible to run the editor without installing a development toolchain. It also means the application code is concentrated in index.html; splitting it into modules is a possible future engineering improvement, not a prerequisite for using the current release.

## Data, privacy and offline use

- The editor does not require registration or a hosted account.
- Project work is stored in browser-local storage by the application.
- Project JSON export is the portable backup mechanism.
- Clearing browser storage, changing browser profiles or moving to another device can make locally stored work unavailable unless it has been exported.
- Image URLs are references; the image files remain hosted at their respective sources.
- No server-side project sync or collaboration is included.

Because the application is client-side, browser extensions, browser policies and local device security remain part of the user's security boundary. Do not use the editor to store secrets or credentials.

## Deployment and troubleshooting

The repository includes a GitHub Actions workflow at .github/workflows/pages.yml. It publishes the repository root when code is pushed to main or when the workflow is run manually.

### Required GitHub settings

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Confirm the repository is public if you are using GitHub Free.
4. Open **Actions → Deploy DevSections Studio to GitHub Pages** and inspect the latest run.
5. Wait for the deployment job to complete successfully, then use the Pages URL shown in the deployment environment or Pages settings.

The workflow requires the repository's Pages site to be enabled. The workflow's pages: write and id-token: write permissions support deployment; they do not replace the one-time Pages source selection in repository settings.

### If the site returns 404

- Confirm **Settings → Pages → Source** is set to **GitHub Actions**.
- Confirm the latest deployment run succeeded. A failed run does not publish a new site.
- Confirm index.html exists at the root of the artifact. It is at the root of this repository.
- Use the site URL shown in **Settings → Pages**, rather than guessing a URL or using a stale browser tab.
- After a successful deployment, allow a few minutes for the new site to become available and try a private/incognito window.

### Workflow permissions

The workflow declares the minimum deployment permissions used by the Pages actions:

- contents: read for checkout.
- pages: write for Pages deployment.
- id-token: write for the deployment identity token.

If an organisation policy or repository ruleset blocks GitHub Actions, an administrator may need to review those restrictions. Do not grant broad write permissions to the workflow as a workaround.

## Development and quality checks

The repository's Quality and security checks workflow runs a Chromium browser suite on pushes to the development branch and on pull requests targeting `main`. It verifies catalogue counts, pagination, brand preview, responsive mode, safe project import, browser persistence and ZIP export integrity.

To run the browser suite locally, install Node.js 22+, install Playwright and Chromium, then run:

~~~bash
npm install --no-save --no-package-lock playwright@1.56.1 esbuild @vue/compiler-sfc svelte
npx playwright install chromium
node tests/browser-smoke.mjs
~~~

Before submitting a change:

- Check the browser console for runtime errors.
- Test the editor in current Chrome, Edge and Firefox.
- Test narrow mobile, tablet and desktop viewport sizes.
- Test project save, reload, JSON export and JSON import.
- Test each relevant export type and run the generated framework's production build.
- Verify that sample content, placeholder links and image references are not presented as real client data.
- Update the release notes and test report when behaviour changes.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution expectations and [docs/TEST-REPORT.md](docs/TEST-REPORT.md) for the current verification record.

## Roadmap

The following are potential areas for future development; they should not be interpreted as features already shipped:

- More complete responsive controls and per-breakpoint overrides.
- Expanded reusable component and design-system workflows.
- Richer media management and local asset handling.
- More complete accessibility and performance auditing.
- More automated browser and framework-export tests.
- A modular source structure as the editor grows.

Feature proposals and reproducible bug reports are welcome through [GitHub Issues](https://github.com/abduays/devsections-studio/issues).

## Security and privacy

See [SECURITY.md](SECURITY.md) for reporting guidance and the product's security boundaries. Imported project JSON and Developer-mode HTML are treated as untrusted input: the editor validates project structure, limits import sizes and sanitises markup before previewing or exporting it. This reduces risk but is not a guarantee that arbitrary custom markup is safe in every downstream environment.

Projects and media references are stored in browser-local storage and are not encrypted or synchronised to a server. Do not store passwords, API keys, access tokens, customer records or confidential business data in projects. User-selected external image hosts can receive visitor request metadata when exported sites load those images. Review and trust all external assets before publishing.

## Licence and reuse

DevSections Studio is released under the [MIT License](LICENSE). The licence permits use, modification, redistribution and commercial reuse subject to preserving the copyright and licence notice. See [LICENCE-DECISION.md](LICENCE-DECISION.md) for scope and important details: MIT does not require third-party forks or hosted versions to remain free of charge. The official DevSections Studio project is intended to remain free.

---

Built as a free, local-first website creation tool.

[Repository](https://github.com/abduays/devsections-studio) · [Issues](https://github.com/abduays/devsections-studio/issues) · [Deployment workflow](https://github.com/abduays/devsections-studio/actions/workflows/pages.yml)
