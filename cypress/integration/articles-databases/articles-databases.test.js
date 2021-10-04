/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Articles & Databases", () => {
  beforeEach(() => {
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

  // Test MultiSelects + FilterBar (complex components, worth testing in isoloation)
  it("MultiSelect", () => {
    cy.get("form")
      .findByRole("button", { name: /Subjects/i })
      .should("exist")
      .click();
    // ul list should have length
    // Click checkbox item
    //.getByLabelText("Art")
    /*  .within(getByRole("listbox"));
    cy.findByLabelText("Art");
    cy.click();
    */
    /*.within(() => {
        cy.findByLabelText("Art");
        cy.click();
      });
      */

    //.should("be.checked");

    cy.findByRole("listbox").within(($listbox) => {
      $listbox.findByLabelText("Art").click();
    });
  });

  // Test AutoSuggest (complex component, worth testing in isolation)
});
