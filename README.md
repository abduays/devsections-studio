# DevSections Studio

**A free, local-first visual website builder.**

DevSections Studio is a standalone browser-based website builder. It is designed to run without an account, backend, paid API, subscription, or external JavaScript package.

## Try it

- **Live demo:** once GitHub Pages is enabled, visit `https://<your-github-username>.github.io/<repository-name>/`.
- **Run locally:** download `index.html` and open it in a modern browser (Chrome, Edge, or Firefox).

## Features in version 2.0

- 210 section designs across 15 categories.
- 10 multi-page website starter kits.
- Global brand colours, typography and corner styling.
- Real-template brand previews.
- Double-click element editing for supported text and visual elements.
- Image URL replacement and a local image-reference shelf.
- Desktop, tablet and mobile previews, with supported section-level overrides.
- Local SEO and accessibility checks.
- Multi-page editing and project JSON backups.
- Export to static HTML ZIP, React + Vite, Next.js, Vue + Vite and SvelteKit starter projects.

See [release notes](docs/RELEASE-NOTES.md) and the [test report](docs/TEST-REPORT.md) for details and limitations.

## Deploy with GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The workflow deploys the root `index.html` when changes are pushed to `main`.
5. Open the Pages URL shown in the repository's Pages settings.

The workflow uses GitHub's official Pages deployment actions. GitHub Pages hosting is subject to GitHub's current account and repository terms.

## Local project storage

Projects are saved in the browser's local storage. Export project JSON regularly as a backup, especially before clearing browser data or changing browsers. The builder does not upload local projects to a server.

## Free-use model and limitations

- No subscriptions, premium feature restrictions, accounts, paid APIs or compulsory remote services are included.
- The image shelf stores image URLs and labels only. It does not download or host image files.
- No cloud collaboration, CMS, database, hosted form delivery, authentication, payments or ecommerce checkout is included.
- Forms in templates are visual examples only until connected to a form service.
- The local SEO/accessibility audit is a basic project checker, not a complete SEO audit or WCAG certification.
- Responsive overrides are limited to supported section-level controls, not unrestricted per-element breakpoint styling.
- Framework exports are starter projects. Review the generated code, install dependencies and run the framework's build process before deployment. Do not inject untrusted content without suitable sanitisation.

## Before publishing a website

Replace sample copy, names, statistics, contact details, testimonials, placeholder links and image references. Verify image licences and permissions. Test navigation, responsive layouts, forms and exported output in the target browsers.

## Project licence

No open-source licence has been selected for this project yet. Until a licence is added, do not assume that the source is licensed for redistribution, modification or commercial reuse. See [LICENCE-DECISION.md](LICENCE-DECISION.md).

## Contributing and security

- See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.
- See [SECURITY.md](SECURITY.md) for responsible vulnerability reporting.