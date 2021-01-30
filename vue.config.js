const title = "LOL Skin Viewer";

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = title;
      return args;
    });
  },
};
