# DevSections Studio 2.0 — Test report

## Automated checks

| Check | Result |
|---|---|
| Main and add-on JavaScript syntax (`node --check`) | PASS |
| HTML parse | PASS |
| Inline CSS parse (`tinycss2`) | PASS |
| Template count | PASS — 210 |
| Category count | PASS — 15 |
| Designs per category | PASS — 14 each |
| Unique template IDs | PASS — 210 unique IDs |
| Full-site starter presets | PASS — all 10 create multi-page projects with populated sections |
| Responsive export metadata | PASS — stable section IDs and media-query overrides included in static HTML |
| Static HTML export | PASS — generated ZIP contains 5 files in test project |
| React + Vite export | PASS — generated ZIP contains 7 files |
| Next.js export | PASS — generated ZIP contains 8 files |
| Vue + Vite export | PASS — generated ZIP contains 7 files |
| SvelteKit export | PASS — generated ZIP contains 10 files |
| Framework package JSON parsing | PASS |

Runtime tests used a Node VM harness with browser API stubs. They verified template registration, starter creation and export generation. They do not replace testing in a real browser.

## Not verified

- Full interactive browser rendering and pointer behaviour were not verified. Chromium headless repeatedly stalled in the environment with D-Bus/zygote errors and produced no DOM dump.
- Framework exports were generated and package JSON was parsed, but dependencies were not installed and production builds were not run.
- Live form submission, CMS integrations, hosting, authentication and remote publishing are not implemented.

## Release assessment

The 2.0 file passes the automated syntax, structure, catalogue, starter-kit and export-generation checks. Treat it as a testable release candidate, not a fully browser-verified production release. Test in Chrome/Edge/Firefox and build each framework export before deploying a real customer website.