# GitHub Pages Live Demo Plan

## Summary

Publish the existing Vue 2/Webpack production artifact at `https://chengchuu.github.io/json-to-resume/`. Preserve the hash router and current application behavior while making generated assets safe for the `/json-to-resume/` subpath. Add core SEO metadata and automated artifact validation without introducing theme, PWA, or framework changes.

## Implementation Changes

- Add a normalized `BASE_PATH` build interface. Default it to `/` for local builds and use `/json-to-resume/` for GitHub Pages. Apply it through Webpack's `output.publicPath` so HTML, CSS, JavaScript, images, fonts, and lazy-loaded chunks use the correct prefix.
- Keep `/` redirecting to `#/resume`; do not add history-routing fallbacks or duplicate HTML files.
- Add `e2e:install`, `build:pages`, and `validate:pages` lifecycle scripts.
- Add `public/robots.txt` and `public/sitemap.xml`, copied into `dist/` by the existing Node build process without another Webpack dependency.
- Enhance `index.html` with a viewport, HTTPS favicon URLs, the title `JSON to Resume – Live Demo`, a factual description, canonical and Open Graph URLs, and `WebApplication` JSON-LD. Preserve the runtime resume-specific `document.title`.
- Replace the README Live Demo link with the GitHub Pages URL. Continue ignoring `dist/`.

## Deployment Workflow

Create `.github/workflows/pages.yml` for pushes to `main` and manual runs:

- Use Node.js 22, `npm install`, disabled package-manager caching, and maintained major versions of the official checkout, setup-node, configure-pages, upload-pages-artifact, and deploy-pages actions.
- Install Playwright Chromium, then run lint, the full test suite, the Pages build, and artifact validation before uploading.
- Upload only `dist/` and deploy from a separate `github-pages` job with the required Pages and OIDC permissions.
- Use `pages` concurrency with `cancel-in-progress: false`.
- Do not publish packages, commit generated output, or use `NODE_OPTIONS=--openssl-legacy-provider`.

## Artifact Validation

Implement a dependency-free CommonJS validator that fails when:

- `dist/index.html`, `robots.txt`, or `sitemap.xml` is missing.
- A local HTML asset starts at `/static/` instead of `/json-to-resume/static/`.
- A referenced local asset does not exist under `dist/`.
- Canonical, Open Graph, robots, sitemap, or JSON-LD URLs differ from `https://chengchuu.github.io/json-to-resume/`.
- Required metadata is absent or multiple canonical links appear.

## Test and Acceptance Plan

- Run `npm run lint`, `npm run unit`, and `npm test` after installing Chromium.
- Run `npm run build` and `npm run build:pages`; treat the existing Webpack size warnings as non-blocking unless new errors appear.
- Run `npm run validate:pages`.
- Start `npm run dev -- --no-open` and verify `/`, `#/resume`, and `#/home`.
- Confirm the deployed root loads, redirects to the resume route, loads lazy chunks without 404s, exposes crawlable metadata files, and reports no uncaught browser errors.
- Finish with `git diff --check` and preserve the existing `pnpm-lock.yaml` and `pnpm-workspace.yaml` changes.

## Interfaces and Assumptions

- `BASE_PATH` is the only new build interface; no application API or resume-data schema changes are required.
- GitHub Pages becomes the primary canonical deployment, replacing the former `i.mazey.net` demo in documentation.
- The sitemap contains only the canonical root because hash routes are not independent crawlable documents.
- No dependency upgrades are required for this work.
