# DevSections Studio 2.2 — Release notes

## Product quality and security work

- Added HTML sanitisation for imported and developer-edited section markup.
- Removed script, iframe, object, embed, SVG and other active content from imported section markup.
- Removed inline event handlers, unsafe URL schemes, form actions and unsafe CSS declarations from imported markup.
- Added validation and size limits for project imports, identifiers, page counts, section counts, brand values and responsive overrides.
- Validated browser-local project data before loading and media references before use.
- Restricted image references to HTTP(S) or safe relative URLs and capped the local image shelf.
- Removed the overlapping legacy template generators that created duplicate template IDs.
- The section library now has exactly 50 generated variants per category and 750 in total.
- Added pagination to the library to avoid rendering all 750 template cards at once.
- Added browser regression checks for the catalogue, pagination, brand preview, responsive mode, malicious project imports, persistence and ZIP exports.

## Known security boundaries

The editor's Developer mode is an HTML authoring feature. Sanitisation reduces risk in editor previews and exports but cannot guarantee that every custom HTML/CSS use is safe for every deployment context. Framework exports still use HTML insertion APIs to render section markup; only trusted, reviewed content should be deployed. The app is not a secure multi-user hosting platform.

## Verification

The automated browser workflow must pass on the release commit. Framework project dependencies are not installed by the editor itself; the exported starter projects still require their own dependency installation and production builds.
