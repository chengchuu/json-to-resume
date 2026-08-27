# Repository Guidelines

## Project structure and module organization

This repository is a Vue 2 single-page application built with Webpack 3. Application code lives in `src/`: `main.js` initializes Vue, `router/` defines routes, `components/` contains the resume and layout views, and `conf/resume.js` is the editable resume data source. Keep images in `src/assets/img/` and Sass in `src/style/`. Webpack and environment settings are split between `build/` and `config/`. Unit tests live in `test/unit/specs/`; Nightwatch end-to-end tests live in `test/e2e/specs/`. Production output is generated in `dist/` and should not be edited by hand.

## Build, test, and development commands

Use Node.js 14.21.3, as documented in the README, and install dependencies with `npm install`.

- `npm run dev` starts the hot-reload development server, normally on port 8081.
- `npm run build` creates the production bundle in `dist/`.
- `npm run lint` checks JavaScript and Vue files with ESLint.
- `npm run lint-fix` applies supported ESLint fixes across source and tooling files.
- `npm run unit` runs Mocha assertions through Karma and PhantomJS.
- `npm run e2e` runs the Nightwatch browser suite.
- `npm test` runs both test suites in sequence.

## Coding style and naming conventions

Follow `.editorconfig`: use UTF-8, LF line endings, two-space indentation, a final newline, and no trailing whitespace. JavaScript follows ESLint Standard with double quotes, semicolons, and trailing commas in multiline structures. Stylelint validates SCSS, and HTMLLint validates templates. Name Vue components and files in kebab case, following the existing `m-resume.vue` pattern. Use descriptive camelCase names for JavaScript variables and configuration keys.

## Testing guidelines

Name unit tests `*.spec.js` so Karma discovers them. Add end-to-end scenarios under `test/e2e/specs/` and keep selectors tied to stable UI behavior. Karma emits LCOV and text coverage reports, but the project defines no minimum coverage threshold. Run the focused suite while developing, then run `npm test` and `npm run lint` before submitting.

## Commit and pull request guidelines

Recent history uses Conventional Commit-style subjects such as `feat(project): ...`, `chore(deps): ...`, and `docs: ...`. Keep the subject concise and imperative; add a scope when it clarifies the affected area. Pull requests should explain the change and verification performed, link relevant issues, and include before-and-after screenshots for visible resume or layout changes. Do not commit generated `dist/` files unless a release workflow explicitly requires them.
