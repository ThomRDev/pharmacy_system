module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    ".+\\.(png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
  },
  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    "\\.(css|styl|less|sass|scss)$": "<rootDir>/tests/mocks/styleMock.js",
  },
};
