const webpackConfig = require("../../build/webpack.test.conf");

module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless"],
    frameworks: ["mocha"],
    plugins: [
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-mocha"),
      require("karma-sourcemap-loader"),
      require("karma-spec-reporter"),
      require("karma-webpack"),
    ],
    reporters: ["spec", "coverage"],
    files: ["./index.js"],
    preprocessors: {
      "./index.js": ["webpack", "sourcemap"],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: "errors-warnings",
    },
    coverageReporter: {
      dir: "./coverage",
      reporters: [
        { type: "lcov", subdir: "." },
        { type: "text-summary" },
      ],
    },
    singleRun: true,
  });
};
