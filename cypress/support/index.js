// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// This package is used for burning tests
// See this article for more information https://glebbahmutov.com/blog/burning-tests/
// The docs you find here: https://github.com/cypress-io/cypress/tree/develop/npm/grep#readme
const registerCypressGrep = require("cypress-grep");
registerCypressGrep();
