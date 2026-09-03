# Repository Guidelines

## Project structure and module organization

This repository is a Vue 2 single-page application built with Webpack 5. Application code lives in `src/`: `main.js` initializes Vue and BootstrapVue, `router/` defines the hash-based routes, `components/` contains the home, resume, and layout views, and `conf/resume.js` is the editable resume data source. Keep bundled images in `src/assets/img/` and Sass in `src/style/`. Webpack configuration lives in `build/`, while environment, output, and `BASE_PATH` normalization live in `config/`. Static crawler files live in `public/`; build and Pages validation helpers live in `scripts/`. Tests are split across `test/node/`, `test/unit/`, and `test/e2e/`. Root-level `eslint.config.js` and `playwright.config.mjs` configure validation. Production output is generated in ignored `dist/` and should not be edited by hand.

## Build, test, and development commands

The repository does not declare a Node.js engine or a `packageManager` version. GitHub Actions uses Node.js 22 and `npm install`. For local dependency work, use pnpm with the committed `pnpm-lock.yaml` and `pnpm-workspace.yaml`; run lifecycle scripts through npm.

- `pnpm install --frozen-lockfile` installs the dependency graph recorded in `pnpm-lock.yaml`.
- `npm run e2e:install` installs the Chromium browser used by end-to-end tests.
- `npm run dev` starts the Webpack development server on port 8081 and opens a browser.
- `npm run dev -- --no-open` starts the development server without opening a browser.
- `npm run build` creates a root-path production bundle in `dist/`.
- `npm run build:pages` creates the GitHub Pages bundle with `/json-to-resume/` as its base path.
- `npm run validate:pages` checks the built Pages assets, metadata, `robots.txt`, and `sitemap.xml`; run it after `npm run build:pages`.
- `npm run build --report` also opens the optional bundle analyzer.
- `npm run lint` checks JavaScript, Vue components, and `index.html` with ESLint 9.
- `npm run lint-fix` applies supported ESLint fixes.
- `npm run test:node` checks base-path normalization and prevents artifact path traversal.
- `npm run unit` runs Mocha and Chai assertions through Karma and ChromeHeadless.
- `npm run e2e` runs the Playwright Chromium suite.
- `npm test` runs the Node, unit, and end-to-end suites in sequence.

## Coding style and naming conventions

Follow `.editorconfig`: use UTF-8, LF line endings, two-space indentation, a final newline, and no trailing whitespace. JavaScript follows the ESLint flat configuration with double quotes, semicolons, and trailing commas in multiline structures. Vue 2 templates use `eslint-plugin-vue` correctness rules, and `index.html` uses `@html-eslint`. Name Vue components and files in kebab case, following the existing `m-resume.vue` pattern. Use descriptive camelCase names for JavaScript variables and configuration keys. Keep Webpack, environment, and release scripts in CommonJS; `playwright.config.mjs` is the explicit ESM exception. Do not add broad guards or fallback state around internal resume data that the component contract already guarantees.

## Testing guidelines

Name unit tests `*.spec.js` so Karma discovers them. Unit tests mount Vue 2 components with Vue Test Utils; `test/unit/index.js` also loads application modules except `main.js` for coverage. Karma emits LCOV and text reports under `test/unit/coverage/` without enforcing a threshold. Put pure Node.js checks in `test/node/` and browser scenarios in `test/e2e/specs/`. Playwright starts `npm run dev -- --no-open` on port 8081 and runs Chromium against the real application. Keep selectors tied to stable routes, headings, badges, progress elements, and footer content, and check for uncaught page errors. Generated coverage, Playwright report, and test-result directories are ignored. Run the focused suite while developing, then run `npm run lint`, `npm test`, `npm run build:pages`, and `npm run validate:pages` before submitting.

## Framework and build boundaries

Keep Vue and `vue-template-compiler` aligned at 2.7.16, Vue Router within major version 3, BootstrapVue within major version 2, and Bootstrap within major version 4. The router uses its default hash mode: `/` redirects to `/resume`, and `/resume` and `/home` load their components with dynamic imports. Preserve port 8081, disabled production source maps, hashed assets under `dist/static/`, runtime/vendor splitting, and optional bundle analysis. `config/base-path.js` normalizes `BASE_PATH`; local builds use `/`, while Pages builds use `/json-to-resume/`. `build/build.js` copies `public/robots.txt` and `public/sitemap.xml` only after Webpack succeeds. Webpack targets an ES5-compatible browser runtime through the repository's Browserslist settings. Do not use `NODE_OPTIONS=--openssl-legacy-provider`.

## GitHub Pages deployment

`.github/workflows/pages.yml` runs on pushes to `main` and manual dispatch. Its build job installs dependencies and Chromium, runs lint and all tests, creates and validates the Pages-specific `dist/` artifact, then uploads it. The deploy job publishes only that artifact. Keep the canonical URL, Open Graph URL, JSON-LD URL, `robots.txt`, sitemap, and `SITE_URL` in `scripts/validate-pages.js` aligned with `https://chengchuu.github.io/json-to-resume/`. Do not run deployment or change repository Pages settings as routine validation.

## Commit and pull request guidelines

Recent history uses Conventional Commit-style subjects such as `feat(project): ...`, `chore(deps): ...`, and `docs: ...`. Keep the subject concise and imperative; add a scope when it clarifies the affected area. Husky runs lint-staged before commits, and lint-staged applies ESLint fixes without an explicit `git add`. Pull requests should explain the change and verification performed, link relevant issues, and include before-and-after screenshots for visible resume or layout changes. Do not commit generated `dist/` files unless a release workflow explicitly requires them.
