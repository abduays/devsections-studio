# Repository setup

## Contents

- `index.html`: standalone DevSections Studio 2.1 application and GitHub Pages entry point.
- `README.md`: project overview, usage and deployment instructions.
- `docs/`: release notes, test report and setup guidance.
- `.github/workflows/pages.yml`: GitHub Actions workflow for GitHub Pages.
- `CONTRIBUTING.md`: contribution expectations.
- `SECURITY.md`: vulnerability reporting guidance.
- `LICENSE`: MIT licence for the original project materials, subject to its terms.
- `LICENCE-DECISION.md`: explains the licence scope and permissive reuse implications.

## First deployment

After pushing to the `main` branch, enable GitHub Pages with **Settings → Pages → Build and deployment → GitHub Actions**. The included workflow publishes the repository root.

## Important

The application is currently a single-file browser app. It does not need Node.js, a package manager, a build step or environment variables to run.
