"use strict";

process.env.NODE_ENV = "production";

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("./webpack.prod.conf");

function copyPublicFiles () {
  ["robots.txt", "sitemap.xml"].forEach(fileName => {
    fs.copyFileSync(
      path.resolve(__dirname, "../public", fileName),
      path.resolve(config.build.assetsRoot, fileName),
    );
  });
}

webpack(webpackConfig, (error, stats) => {
  if (error) {
    throw error;
  }

  process.stdout.write(`${stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  })}\n`);

  if (stats.hasErrors()) {
    process.exitCode = 1;
    return;
  }

  copyPublicFiles();
});
