"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("../config");

exports.assetsPath = function (assetPath) {
  const assetsSubDirectory = process.env.NODE_ENV === "production"
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return `${assetsSubDirectory}/${assetPath}`;
};

exports.styleLoaders = function (options = {}) {
  const styleLoader = options.extract
    ? MiniCssExtractPlugin.loader
    : "vue-style-loader";
  const cssLoaders = [
    styleLoader,
    {
      loader: "css-loader",
      options: {
        esModule: false,
        sourceMap: options.sourceMap,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [require("autoprefixer")],
        },
        sourceMap: options.sourceMap,
      },
    },
  ];
  const sassLoader = {
    loader: "sass-loader",
    options: {
      implementation: require("sass"),
      sourceMap: options.sourceMap,
    },
  };

  return [
    {
      test: /\.css$/,
      use: cssLoaders,
    },
    {
      test: /\.scss$/,
      use: [...cssLoaders, sassLoader],
    },
    {
      test: /\.sass$/,
      use: [
        ...cssLoaders,
        {
          ...sassLoader,
          options: {
            ...sassLoader.options,
            sassOptions: {
              indentedSyntax: true,
            },
          },
        },
      ],
    },
  ];
};
