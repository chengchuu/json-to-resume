"use strict";

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../config");
const utils = require("./utils");
const baseWebpackConfig = require("./webpack.base.conf");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }),
  },
  devServer: {
    client: {
      overlay: true,
    },
    historyApiFallback: true,
    hot: true,
    open: config.dev.autoOpenBrowser,
    port: config.dev.port,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": config.dev.env.NODE_ENV,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: "body",
    }),
  ],
});
