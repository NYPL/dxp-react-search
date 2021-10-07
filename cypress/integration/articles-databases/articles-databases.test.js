/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Articles & Databases", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);

    cy.visit(
      "http://localhost:3000/research/collections/articles-databases/search"
    );
  });

  // Test basic page loading.
  /*it("Load the articles & databases search page.", () => {
    cy.get("h1").contains("Find Your Library");
  });
  */

  // Test basic search

  // Test basic search with autosuggest
  /*it("Autosuggest suggestions work", () => {
    cy.get("input#search-form__search-input")
      .type("Lib")
      .type("{downarrow}")
      .click()
      .should("have.value", "125th Street Library");
  });
  */

  // Test advanced search with search query and mutliSelect filters
});
