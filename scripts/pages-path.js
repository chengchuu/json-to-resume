"use strict";

const path = require("path");

function resolveDistAsset (distDir, assetPath) {
  const distRoot = path.resolve(distDir);
  const resolvedPath = path.resolve(distRoot, assetPath);

  if (!resolvedPath.startsWith(distRoot + path.sep)) {
    throw new Error("Local asset resolves outside dist: " + assetPath);
  }

  return resolvedPath;
}

module.exports = resolveDistAsset;
