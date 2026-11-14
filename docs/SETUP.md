# Repository setup

## Contents

- `index.html`: standalone DevSections Studio application and GitHub Pages entry point.
- `README.md`: project overview, usage and deployment instructions.
- `docs/`: release notes, test report and setup guidance.
- `.github/workflows/pages.yml`: GitHub Actions workflow for GitHub Pages.
- `CONTRIBUTING.md`: contribution expectations.
- `SECURITY.md`: vulnerability reporting guidance.
- `LICENCE-DECISION.md`: records that the project licence remains undecided.

## First deployment

After pushing to the `main` branch, enable GitHub Pages with **Settings → Pages → Build and deployment → GitHub Actions**. The included workflow publishes the repository root.

## Important

The application is currently a single-file browser app. It does not need Node.js, a package manager, a build step or environment variables to run.
