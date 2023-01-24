module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { esmodules: true, node: "current" } }],
    "@babel/preset-flow",
    "@babel/preset-typescript",
  ],
};
