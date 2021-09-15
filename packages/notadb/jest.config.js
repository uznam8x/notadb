module.exports = {
  verbose: true,
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts"],
  globals: {
    "ts-jest": {
      diagnostics: true,
      //tsconfig: "./tsconfig.json",
    },
  },
};
