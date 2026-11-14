# Security Policy

## Supported release

Security fixes are applied to the current default branch. Older copies and exported projects should be updated manually.

## Reporting a vulnerability

Do not publish exploitable details in a public issue. Use GitHub's private vulnerability reporting feature when available. If it is unavailable, contact the repository owner through a verified private channel.

## Security boundaries

- Project JSON and Developer-mode HTML are untrusted input and must pass the built-in sanitisation and validation path.
- The editor and exported static pages apply a restrictive Content Security Policy: remote scripts, frames, objects, forms and network connections are blocked; external images remain allowed for user-selected assets.
- Generated framework exports contain HTML rendering code. Review generated output and sanitise any content supplied by an external user before production use.
- Image URLs are loaded from user-selected external hosts. Only use trusted HTTPS sources; remote images can disclose visitor IP and request metadata to their host. The editor rejects remote HTTP image URLs and applies a no-referrer policy.
- Browser-local projects are not encrypted. Do not store credentials, access tokens, customer records or other confidential data in projects.
- Do not commit secrets, private user projects, personal contact details or production environment files.
- GitHub Actions workflows should retain least-privilege permissions and pinned action versions.
- If a credential is ever committed, revoke or rotate it immediately. Removing it from the current file does not erase it from Git history or existing clones.

## Maintainer checks

Before a release, review the full diff and current repository tree for secrets and private data, run the quality workflow, review generated framework output, and inspect GitHub Actions permissions.
