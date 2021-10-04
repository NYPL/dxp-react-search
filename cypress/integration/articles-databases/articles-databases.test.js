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
  it("Checking a single item in MultiSelect updates query params correctly.", () => {
    const multiSelectContainer = cy
      .get("form")
      // Open multiselect.
      .findByRole("button", { name: "Subjects" })
      .closest("div");

    cy.get("form")
      // Open multiselect.
      .findByRole("button", { name: "Subjects" })
      .click()

      // Back to parent multiselect.
      .closest("div")

      // Check the checkbox.
      .findByRole("listbox")
      .findByLabelText("Art")
      .click()
      .should("be.checked")

      // Back to parent multiselect.
      //.closest("div")
      // Check counter is updated
      //.findByRole("button", { name: /Subjects/ })
      //.should("exist")

      // Back to parent multiselect.
      .closest("div")
      // Submit multiselect.
      .findByRole("button", { name: "Apply Filters" })
      .click()

      // Check that the url has been updated correctly.
      .location()
      .should((loc) => {
        expect(loc.search).to.eq("?q=&subject=64&page=1");
        expect(loc.pathname).to.eq(
          "/research/collections/articles-databases/search"
        );
      });
  });

  // Test AutoSuggest (complex component, worth testing in isolation)
});
