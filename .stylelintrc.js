module.exports = {
  extends: ["stylelint-config-standard"],
  // 插件
  plugins: ["stylelint-scss"],
  // 自定义规则
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "font-family-no-missing-generic-family-keyword": null,
  },
};
