module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
