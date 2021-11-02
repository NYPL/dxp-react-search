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

/*declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      basicSearch(
        searchQuery: string,
        queryParams: string,
        pathName: string
      ): void;
    }
  }
}

// @TODO I don't like this.
Cypress.Commands.add(
  "basicSearch",
  (searchQuery: string, queryParams: string, pathName: string) => {
    cy.log("Enter a basic text search term.");
    cy.findByRole("textbox", {
      name: /search articles and databases/i,
    }).type(searchQuery);

    cy.log("Submit the form");
    cy.findByRole("button", { name: "Search" })
      .click()
      .wait(3000)
      .get("#search-results")
      .first()
      .as("searchResultsFirst");

    cy.log("First search result should be ...");
    cy.get("@searchResultsFirst")
      .findAllByRole("heading", { name: /New York Times/i })
      .should("exist");

    cy.log("Confirm url state is updated correctly");
    cy.location().should((loc) => {
      expect(loc.search).to.eq(queryParams);
      expect(loc.pathname).to.eq(pathName);
    });
  }
);
*/
