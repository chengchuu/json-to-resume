"use strict";

const { merge } = require("webpack-merge");
const utils = require("./utils");
const baseWebpackConfig = require("./webpack.base.conf");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: utils.styleLoaders(),
  },
});

delete webpackConfig.entry;

module.exports = webpackConfig;
