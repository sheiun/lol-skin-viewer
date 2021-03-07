const { version } = require("./package.json");

const title = "LOL Skin Viewer - " + version;

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = title;
      return args;
    });
  },
};
