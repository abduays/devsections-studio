# DevSections Studio 2.2 — Test report

## Automated browser regression suite

The GitHub Actions workflow `.github/workflows/quality.yml` installs Chromium and runs `tests/browser-smoke.mjs`.

The browser suite checks:
- Exactly 750 catalogue entries across 15 categories.
- Exactly 50 designs and 50 unique IDs per category.
- Paginated library rendering (24 cards per page).
- Category filtering and pagination.
- Brand customiser preview and brand token updates.
- Mobile and desktop viewport switching.
- Template insertion into the page canvas.
- Sanitisation of malicious imported project markup.
- Static HTML, React, Next.js, Vue and Svelte ZIP archive integrity.
- Local project persistence after reload.
- Uncaught browser runtime errors.

## Security checks in the application

- Project imports are capped at 5 MB, 30 pages and 100 sections per page.
- Imported section HTML is capped at 150 KB per section and sanitised.
- Imported page and section IDs are validated.
- Brand colours, font stacks, corner radii, style overrides and responsive settings are allowlisted.
- Event-handler attributes and active embedded content are removed.
- URL schemes and CSS declarations are filtered.
- Media references are capped at 100 entries and validated before use.

## Not covered by the browser smoke suite

- Exhaustive visual review of all 750 designs at every viewport.
- Screen-reader testing and formal WCAG conformance.
- Production builds of all four generated framework starters.
- Penetration testing by an independent security reviewer.
- Git history rewriting or credential revocation if a real secret is discovered in an earlier commit.

## Release assessment

A passing browser workflow is required before merging this branch. Automated tests reduce regression risk but do not constitute a full security audit or guarantee that user-authored custom HTML is safe in every downstream hosting environment.
