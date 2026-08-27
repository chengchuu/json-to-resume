import Vue from "vue";

Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context("./specs", true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// Require application modules except main.js so coverage includes source files.
const srcContext = require.context("../../src", true, /^\.\/(?!main\.js$).+\.(js|vue)$/);
srcContext.keys().forEach(srcContext);
