module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx,tsx}", "!**/node_modules/**"],
  setupFiles: ["<rootDir>/jest.setupFiles.js"],
  setupFilesAfterEnv: [
    "<rootDir>/testHelper/browser.js",
    "<rootDir>/jest.setupFiles.js",
    "react-intersection-observer/test-utils",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/"],
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql",
    ".*": "babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
