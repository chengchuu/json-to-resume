"use strict";

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const config = require("../config");
const utils = require("./utils");
const baseWebpackConfig = require("./webpack.base.conf");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  devtool: config.build.productionSourceMap ? "source-map" : false,
  output: {
    clean: true,
    filename: utils.assetsPath("js/[name].[contenthash:8].js"),
    chunkFilename: utils.assetsPath("js/[name].[contenthash:8].js"),
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          ecma: 5,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": config.build.env.NODE_ENV,
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash:8].css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash:8].css"),
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
});

if (config.build.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
