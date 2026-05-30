// Push Tag
const { gitTagPush } = require("mazey/scripts/github-helper.js");
const pkgVersion = require("../package.json").version;

gitTagPush(pkgVersion)
  .then(res => {
    if (res) {
      console.log("Pushed tag to GitHub.");
    }
  });
