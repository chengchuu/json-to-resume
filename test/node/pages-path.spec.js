"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const normalizeBasePath = require("../../config/base-path");
const resolveDistAsset = require("../../scripts/pages-path");

test("normalizes supported Pages base paths", () => {
  assert.equal(normalizeBasePath(), "/");
  assert.equal(normalizeBasePath(" json-to-resume "), "/json-to-resume/");
  assert.equal(normalizeBasePath("/nested//project/"), "/nested/project/");
});

test("rejects relative base path segments after URL decoding", () => {
  assert.throws(() => normalizeBasePath("/project/../"), /relative path segments/);
  assert.throws(() => normalizeBasePath("/project/%2e%2e/"), /relative path segments/);
  assert.throws(() => normalizeBasePath("/project/%2E./"), /relative path segments/);
});

test("rejects malformed URL encoding in base paths", () => {
  assert.throws(() => normalizeBasePath("/project/%2/"), /valid URL encoding/);
});

test("keeps validated asset paths inside dist", () => {
  const distDir = path.resolve("dist");

  assert.equal(
    resolveDistAsset(distDir, "static/js/app.js"),
    path.join(distDir, "static/js/app.js"),
  );
  assert.throws(() => resolveDistAsset(distDir, "../README.md"), /outside dist/);
});
