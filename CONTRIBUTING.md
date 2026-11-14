# Contributing

Thanks for considering a contribution to DevSections Studio.

## Before submitting changes

1. Describe the problem or improvement clearly.
2. Keep the standalone app free of mandatory paid services and paid API dependencies.
3. Avoid adding external runtime dependencies unless there is a strong technical reason.
4. Preserve project import/export compatibility where practical.
5. Test the app in current Chrome, Edge and Firefox.
6. Test desktop, tablet and mobile layouts.
7. Run the browser regression suite when changing editor behaviour, imports or exports.
8. Update the README, release notes and test report when behaviour or setup changes.

## Run the browser suite

~~~bash
npm install --no-save --no-package-lock playwright@1.56.1
npx playwright install chromium
node tests/browser-smoke.mjs
~~~

## Pull requests

Include:
- A concise description of the change.
- Steps to reproduce or test it.
- Screenshots for visible UI changes, where useful.
- Any known limitations or migration notes.
- Test results and browser versions where relevant.

Do not include secrets, API keys, private user projects, personal contact information or copyrighted assets without permission.

## Licence

By submitting a contribution, you agree that your contribution is provided under the repository's MIT License. Do not submit material that you do not have permission to license under these terms. Preserve third-party notices where applicable.
