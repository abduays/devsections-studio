# DevSections Studio 2.2 — Assessment report

## Automated verification

GitHub Actions runs the regression suite in Chromium, Firefox and WebKit. The Chromium job additionally performs production builds of all four generated framework starters.

Verified on the latest completed run:
- 750 designs across 15 categories, 50 designs per category.
- Unique template IDs and valid section root markup.
- Category filtering, pagination, brand preview, responsive device modes and template insertion.
- Horizontal overflow checks for every template at 375px, 768px and 1440px.
- Hostile import sanitisation, unsafe URL and CSS filtering, and non-execution of imported payloads.
- ZIP integrity for static HTML, React, Next.js, Vue and Svelte exports.
- Production builds for React/Vite, Next.js, Vue/Vite and SvelteKit.
- Source scans for common credential patterns, private-key blocks, dynamic code execution and non-placeholder email addresses.
- Content Security Policy, no-referrer metadata, local persistence and uncaught browser runtime errors.

## Automated accessibility assessment

The CI suite runs axe-core against the editor interface and an inserted template canvas for WCAG 2.0/2.1 A and AA rules. Critical and serious automated findings fail the job. This is a screening check, not a complete WCAG conformance assessment; manual keyboard, screen-reader, focus-order, zoom/reflow and cognitive accessibility testing remain necessary.

## Application security controls reviewed

- Project imports are capped at 5 MB, 30 pages, 100 sections per page, 300 sections total and 4 MB of section HTML.
- Imported section HTML is capped at 150 KB per section and sanitised.
- Imported page and section IDs are validated.
- Brand colours, font stacks, corner radii, style overrides and responsive settings are allowlisted.
- Event-handler attributes and active embedded content are removed.
- URL schemes and CSS declarations are filtered; remote images require HTTPS and protocol-relative URLs are rejected.
- Media references are capped at 100 entries, validated before use and rejected if the stored shelf exceeds 1 MB.
- Image loads use a no-referrer policy.
- Imported page slugs are made unique to prevent export filename collisions.
- Imported form elements are flattened to prevent arbitrary form submission behaviour.
- GitHub Actions use least-privilege contents permissions and pinned action SHAs.

## Hosting and repository governance assessment

- The Pages workflow is configured to deploy only from `main`, with Pages write and OIDC permissions scoped to the deployment workflow.
- The Pages deployment URL and current deployment state could not be independently verified through the available GitHub connection or web access during this assessment.
- The repository rulesets endpoint returned an empty list. The branch-protection endpoint returned HTTP 403 to the connected GitHub integration, so classic protection settings could not be inspected or changed.
- Enable a main-branch ruleset requiring pull requests and the three browser regression checks, and blocking force pushes and branch deletion.
- The repository About description still needs a maintainer review to ensure it reflects the current 750-design catalogue.

## Not covered

- Independent penetration testing.
- Formal WCAG conformance or a complete screen-reader audit.
- Exhaustive visual review of every design on physical devices.
- A full historical Git-object scan and independent confirmation that no credential was ever committed.
- Live hosting availability and custom-domain/TLS checks.

## Release assessment

The automated browser and framework build checks have passed on the merged revision. This is not a guarantee that every user-authored HTML/CSS combination is safe in downstream hosting environments. Browser-local project data is not encrypted; do not store credentials or confidential customer information in projects. Complete the hosting and branch-governance checks before treating repository operations as fully hardened.
