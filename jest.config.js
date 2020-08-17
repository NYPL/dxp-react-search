module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/testHelper/browser.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
