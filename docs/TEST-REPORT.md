# DevSections Studio 2.2 — Test report

## Automated browser regression suite

The GitHub Actions workflow `.github/workflows/quality.yml` installs Chromium and runs `tests/browser-smoke.mjs`.

The browser suite checks:
- Exactly 750 catalogue entries across 15 categories.
- Exactly 50 designs and 50 unique IDs per category.
- Global template ID uniqueness.
- One valid section root for every generated template.
- Paginated library rendering (24 cards per page).
- Category filtering and pagination.
- Brand customiser preview and brand token updates.
- Mobile and desktop viewport switching.
- Template insertion into the page canvas.
- Sanitisation of malicious imported project markup, event handlers, unsafe URL schemes and CSS URL loads.
- Static HTML, React, Next.js, Vue and Svelte ZIP archive integrity.
- React and Next.js JSX parsing, Vue single-file component parsing/template compilation, and Svelte component compilation.
- Source scan for common credential patterns, private-key blocks, dynamic code execution and non-placeholder email addresses.
- Content Security Policy and no-referrer metadata.
- Local project persistence after reload.
- Uncaught browser runtime errors.

## Security controls in the application

- Project imports are capped at 5 MB, 30 pages, 100 sections per page, 300 sections total and 4 MB of section HTML.
- Imported section HTML is capped at 150 KB per section and sanitised.
- Imported page and section IDs are validated.
- Brand colours, font stacks, corner radii, style overrides and responsive settings are allowlisted.
- Event-handler attributes and active embedded content are removed.
- URL schemes and CSS declarations are filtered; remote images require HTTPS and protocol-relative URLs are rejected.
- Media references are capped at 100 entries, validated before use and rejected if the stored shelf exceeds 1 MB.
- Image loads use a no-referrer policy to avoid sending the editor page URL to remote image hosts.
- Imported page slugs are made unique to prevent export file collisions.
- Imported form elements are flattened to prevent arbitrary form submission behaviour.

## Not covered by the browser smoke suite

- Exhaustive visual review of all 750 designs at every viewport.
- Screen-reader testing and formal WCAG conformance.
- Production builds of all four generated framework starters.
- Penetration testing by an independent security reviewer.
- Git history rewriting or credential revocation if a real secret is discovered in an earlier commit.

## Release assessment

A passing browser workflow is required before merging this branch. Automated tests reduce regression risk but do not constitute a full security audit or guarantee that user-authored custom HTML is safe in every downstream hosting environment.
