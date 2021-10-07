// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";
//import userEvent from '@testing-library/user-event';

/*Cypress.Commands.add(
  "openMultiSelect",
  { prevSubject: "optional" },
  (subject, name) => {
    if (subject) {
      // wrap the existing subject
      // and do something with it
      cy.findByRole("button", { name: name }).click().then(cy.wrap(subject));
    }
  }
);
*/

Cypress.Commands.add("openMultiSelect", (name) => {
  cy.findByRole("button", { name: name })
    .click()
    // Back to parent div of multiselect.
    .closest("div");
});
