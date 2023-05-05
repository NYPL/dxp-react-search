const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  // Add more setup options before each test is run
  setupFiles: ["<rootDir>/jest.setupFiles.js"],
  setupFilesAfterEnv: [
    "<rootDir>/testHelper/set-env-vars.js",
    "<rootDir>/jest.setupFiles.js",
    "react-intersection-observer/test-utils",
  ],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/cypress/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
