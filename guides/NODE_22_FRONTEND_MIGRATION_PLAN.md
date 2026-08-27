# Node.js 22 Frontend Migration Plan

## Summary

Upgrade the project from Node.js 14 to Node.js 22 with Webpack 5 while preserving Vue 2, the resume data contract, existing routes, browser targets, and production output behavior. Do not migrate to Vue 3, Bootstrap 5, or Vite as part of this work.

The migration must remove the Webpack 3 OpenSSL dependency, obsolete browser binaries, retired Babel packages, and incompatible loader APIs. It must not rely on `NODE_OPTIONS=--openssl-legacy-provider`.

## Runtime and package policy

- Set `engines.node` to `22.x` and require npm 10 or later. Add `.nvmrc` containing `22`.
- Update `README.md` and `AGENTS.md` to document Node.js 22 and the revised test tools.
- Use `pnpm install`, `pnpm add`, `pnpm update`, and `pnpm remove` for local dependency operations. Continue to run lifecycle commands with `npm run <script>`.
- Preserve the current no-lockfile policy. Keep `package-lock.json` ignored, do not add `pnpm-lock.yaml`, and do not add a `packageManager` field. Disable lockfile generation during migration commands.
- Keep `package.json` in CommonJS mode. Use explicit `.mjs` files only where an ESM-only tool requires them.

## Dependency changes

Retain Vue 2 and align `vue` and `vue-template-compiler` at 2.7.16. Update `vue-router` within major version 3 and update BootstrapVue and Bootstrap within their current major versions. Vue 2 and Bootstrap 4 remain end-of-life dependencies; record that residual risk instead of expanding this migration to new framework majors.

Remove runtime dependencies that have no imports or other consumers in source, build, test, or release code:

- `axios`
- `element-ui`
- `jquery`
- `normalize.css`
- `vue-aplayer`
- `vue-screenfull`
- `vuex`

Move `mazey` to `devDependencies` because only `scripts/pushTag.js` uses it.

Replace the legacy build stack with Webpack 5, webpack-dev-server 5, webpack-cli, vue-loader 15, Babel 7, MiniCssExtractPlugin, current PostCSS/CSS loaders, Webpack asset modules, and supported JavaScript and CSS minimizers. Replace `babel-preset-stage-2` with `@babel/preset-env`; the application does not use syntax that requires the retired Stage 2 preset.

Keep Dart Sass rather than a native `node-sass` binding. Use a Node.js 22-compatible `sass-loader` and pin Sass to 1.77.8 so the local Bootstrap 4 Sass `@import` structure remains stable without a broad stylesheet rewrite.

Remove obsolete or superseded tooling, including PhantomJS, Selenium Server, ChromeDriver, Nightwatch, Babel 6 packages, `eslint-loader`, `extract-text-webpack-plugin`, `url-loader`, `file-loader`, the custom Express development server, and unused HTML/Stylelint packages.

## Build and module configuration

- Update the existing base, development, production, and test Webpack configurations instead of changing build systems.
- Preserve port 8081, automatic browser opening for normal development, history fallback, `/` as the public path, `dist/` output, hashed production assets, source-map policy, and optional bundle analysis.
- Use Webpack 5 `mode`, `output.clean`, asset modules, `optimization.splitChunks`, and `runtimeChunk` instead of removed Webpack 3 plugins.
- Configure Babel from the existing Browserslist targets and emit an ES5-compatible Webpack runtime.
- Replace the two AMD-style lazy component loaders in `src/router/index.js` with dynamic `import()` calls.
- Keep Webpack and release scripts in CommonJS. This avoids changing `scripts/pushTag.js` or introducing a repository-wide ESM conversion.

## Lint and commit hooks

Replace `.eslintrc.js` with an ESLint 9 flat configuration. Use `eslint-plugin-vue` for Vue 2 parsing and correctness rules, plus maintained ESLint Stylistic rules for the existing conventions: two-space indentation, double quotes, semicolons, and trailing commas in multiline structures.

Preserve `npm run lint` and `npm run lint-fix`. Upgrade Husky and lint-staged, convert the old lint-staged schema, and remove automatic `git add` commands. Do not add Prettier. Remove Stylelint and HTMLLint configuration only after confirming that the replacement lint path covers the files previously checked; the current Stylelint ignore pattern already excludes `src/style/`.

## Test migration

- Upgrade Karma, karma-webpack, Mocha, Chai, and coverage tooling for Node.js 22 and Webpack 5.
- Run unit tests in ChromeHeadless instead of PhantomJS. Preserve LCOV and text coverage reports without adding a new coverage threshold.
- Replace the stale `HelloWorld` fixture with a unit test that mounts `m-home.vue` and verifies its heading and descriptive text.
- Replace the obsolete Nightwatch test and runner with Playwright. Let Playwright start `npm run dev -- --no-open` through its `webServer` configuration.
- Cover the `/` to `/resume` redirect, document title, resume heading, badges, skill progress, footer, `/home`, and uncaught browser errors in Chromium.

## Validation and acceptance criteria

Run validation on Node.js 22 with the installed npm and pnpm versions:

1. Install dependencies with pnpm without creating a lockfile and record all deprecation or peer-dependency warnings.
2. Install Playwright Chromium.
3. Run `npm run lint` and confirm that a second lint pass is clean after any one-time normalization.
4. Run `npm run unit` and confirm ChromeHeadless tests and coverage reporting complete.
5. Run `npm run e2e`, then run the combined `npm test` command.
6. Run `npm run build` without an OpenSSL legacy-provider flag and inspect the generated `dist/` asset structure.
7. Start `npm run dev -- --no-open`, request the application on port 8081, verify a successful response, and stop the server cleanly.
8. Run a production dependency audit, `git diff --check`, and `git status --short`.

The final implementation report must list dependency additions, updates, moves, and removals with reasons; enumerate modified and deleted files; and give exact install, lint, unit, end-to-end, combined test, build, and development-startup results. Report retained Vue 2 or Bootstrap 4 risks and any environment limitations separately from successful checks.
