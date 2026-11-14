# DevSections Studio 2.2 — Release notes

## Product quality and template library

- Expanded the library to exactly **750 designs**: 50 in each of 15 categories.
- Each category now contains ten structural compositions, each offered in five visual themes.
- Structural compositions use five layout treatments: Balanced, Centered, Narrow Editorial, Wide Canvas and Framed Panel.
- Added new structural patterns across hero, navigation, about, services, features, portfolio, testimonials, pricing, process, team, statistics, FAQ, contact, CTA and footer categories.
- Removed overlapping legacy template generators that created duplicate IDs and inflated catalogue counts.
- Added library pagination (24 cards per page) to reduce initial DOM size and improve browsing performance.

## Security and privacy

- Added HTML sanitisation for imported and developer-edited section markup.
- Removed script, iframe, object, embed, SVG and other active content from imported section markup.
- Removed inline event handlers, unsafe URL schemes, form actions and unsafe CSS declarations from imported markup.
- Added validation and size limits for project imports, identifiers, page counts, section counts, brand values and responsive overrides.
- Validated browser-local project data before loading and media references before use.
- Restricted remote image references to HTTPS (plus safe relative paths), applied no-referrer loading and capped the local image shelf.
- Added a browser regression workflow that tests malicious project imports and unsafe CSS/URL handling.
- Added a restrictive Content Security Policy to the editor and static HTML exports.
- Pinned GitHub Actions to verified commit SHAs and enabled weekly Dependabot updates.

## Editor and export checks

- Added browser checks for catalogue counts, unique IDs, template root markup, pagination, brand preview, responsive mode, template insertion and local persistence.
- Added ZIP integrity checks for static HTML, React, Next.js, Vue and Svelte exports.
- Updated application labels and documentation to version 2.2.

## Known security boundaries

The editor's Developer mode is an HTML authoring feature. Sanitisation reduces risk in editor previews and exports but cannot guarantee that every custom HTML/CSS use is safe for every deployment context. Framework exports still use HTML insertion APIs to render section markup; only trusted, reviewed content should be deployed. The app is not a secure multi-user hosting platform.

## Verification

The GitHub Actions browser workflow must pass on the release commit. Framework project dependencies are not installed by the editor itself; exported starter projects still require their own dependency installation and production builds.
