/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Location Finder", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/locations");
  });

  // Test basic page loading.
  it("Load the location finder page.", () => {
    cy.get("h1").contains("Find Your Library");
  });

  // Test basic search

  // Test basic search with autosuggest
  it("Autosuggest suggestions work", () => {
    cy.get("input#search-form__search-input")
      .type("Lib")
      .type("{downarrow}")
      .click()
      .should("have.value", "125th Street Library");
  });

  // Test advanced search with search query and mutliSelect filters

  // Test MultiSelects + FilterBar (complex components, worth testing in isoloation)

  // Test AutoSuggest (complex component, worth testing in isolation)
});
