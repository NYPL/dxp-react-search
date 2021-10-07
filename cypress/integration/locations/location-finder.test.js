/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Location Finder", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);

    cy.visit("http://localhost:3000/locations");
  });

  // Test basic page loading.
  it("Load the location finder page.", () => {
    cy.findAllByRole("heading", { level: 1, name: "Find Your Library" }).should(
      "exist"
    );
  });

  // Test basic search
  it("Basic search without using autosuggest or filters.", () => {
    cy.get("form")
      .log("Enter search for location")
      .findByLabelText(
        "Enter an address or landmark to search nearby or type in a Library name."
      )
      .type("schwarzman");

    cy.log("Submit the form");
    cy.get("form")
      .findByRole("button", { name: "Search" })
      .click()
      .wait(3000)
      .get("#locations-list ul li")
      .first()
      .as("locationList");

    cy.log("First search result should be Stephen A. Schwarzman Building.");
    cy.get("@locationList")
      .findAllByRole("heading", { name: /Stephen A. Schwarzman Building/ })
      .should("exist");
  });

  // Test basic search with autosuggest
  it("Basic search using autosuggestion as search term.", () => {
    cy.get("form")
      .log("Enter search for location")
      .findByLabelText(
        "Enter an address or landmark to search nearby or type in a Library name."
      )
      .type("snfl")
      .type("{downarrow}")
      .click();

    cy.log("Submit the form");
    cy.get("form")
      .findByRole("button", { name: "Search" })
      .click()
      .wait(3000)
      .get("#locations-list ul li")
      .first()
      .as("locationList");

    cy.log(
      "First search result should be Stavros Niarchos Foundation Library (SNFL)."
    );
    cy.get("@locationList")
      .findAllByRole("heading", {
        name: "Stavros Niarchos Foundation Library (SNFL)",
      })
      .should("exist");
  });

  // Test advanced search with search query and mutliSelect filters
  it("Advanced search using autosuggestion as search term and multiselect filter.", () => {
    cy.get("form")
      .log("Enter search for location")
      .findByLabelText(
        "Enter an address or landmark to search nearby or type in a Library name."
      )
      .type("art")
      .type("{downarrow}")
      .click();

    cy.log("Select art from 'Subject Specialties' multiselect filter");
    // Open multiselect.
    cy.get("form")
      .findByLabelText("Subject Specialties")
      .click({ force: true })
      .closest("div")
      .findByRole("listbox")
      .findByLabelText("Art")
      .click()
      .should("be.checked");

    cy.log("Submit the form using the multiselect filter");
    cy.get("form")
      .findByLabelText("Subject Specialties")
      .parent("div")
      // Submit multiselect.
      .findByRole("button", { name: "Apply Filters" })
      .click()
      .wait(3000)
      .get("#locations-list ul li")
      .first()
      .as("locationList");

    cy.log("First search result should be Art & Architecture Collection.");
    cy.get("@locationList")
      .debug()
      .findAllByRole("heading", {
        name: "Art & Architecture Collection",
      })
      .should("exist");

    cy.log("Search results details is updated properly");
    cy.get("#locations-list")
      .findByRole("alert")
      .should("include.text", "Showing 10 results.");
  });

  // Test MultiSelects + FilterBar (complex components, worth testing in isoloation)

  // Test AutoSuggest (complex component, worth testing in isolation)
});
