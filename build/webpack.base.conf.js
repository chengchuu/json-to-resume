"use strict";

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const config = require("../config");
const utils = require("./utils");
const vueLoaderConfig = require("./vue-loader.conf");

function resolve (dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  target: ["web", "es5"],
  entry: {
    app: "./src/main.js",
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath: config.build.assetsPublicPath,
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
    },
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
        generator: {
          filename: utils.assetsPath("img/[name].[contenthash:7][ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
        generator: {
          filename: utils.assetsPath("media/[name].[contenthash:7][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
        generator: {
          filename: utils.assetsPath("fonts/[name].[contenthash:7][ext]"),
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
