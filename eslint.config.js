const html = require("@html-eslint/eslint-plugin");
const htmlParser = require("@html-eslint/parser");
const js = require("@eslint/js");
const stylistic = require("@stylistic/eslint-plugin");
const vue = require("eslint-plugin-vue");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "test/unit/coverage/**",
    ],
  },
  js.configs.recommended,
  ...vue.configs["flat/vue2-essential"],
  {
    files: ["**/*.{js,mjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
      sourceType: "module",
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/arrow-parens": ["error", "as-needed"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
  },
  {
    files: ["index.html"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      "@html-eslint": html,
    },
    rules: {
      "@html-eslint/indent": ["error", 2],
      "@html-eslint/no-duplicate-attrs": "error",
      "@html-eslint/require-closing-tags": "error",
    },
  },
];
