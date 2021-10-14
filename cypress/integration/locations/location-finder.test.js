import { basicSearch, advancedSearch } from "./../../support/utils";

describe("Location Finder", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);

    cy.visit("http://localhost:3000/locations");
  });

  it("Load the location finder page.", () => {
    cy.findAllByRole("heading", { level: 1, name: "Find Your Library" }).should(
      "exist"
    );
  });

  it("Basic search without using autosuggest or filters.", () => {
    basicSearch("schwarzman", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
    })
      .first()
      .findAllByRole("heading", { name: /Stephen A. Schwarzman Building/i })
      .should("exist");
  });

  it("Advanced search using autosuggestion as search term.", () => {
    advancedSearch("snfl", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
    })
      // @TODO this fail for some reason?
      .first()
      .findAllByRole("heading", {
        name: /Stavros Niarchos Foundation Library (SNFL)/i,
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
