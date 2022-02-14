import { search } from "./../../support/utils";

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
    search("schwarzman", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
    })
      .first()
      .findByRole("heading", { name: /Stephen A. Schwarzman Building/i })
      .should("exist");
  });

  it("Advanced search using autosuggestion as search term.", () => {
    search("snfl", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
      autoSuggest: true,
      autoSuggestDownArrowCount: 2,
    })
      .first()
      .findByRole("heading", {
        name: /stavros niarchos foundation/i,
      })
      .should("exist");
  });

  // @TODO This will need to change after LF gets updated with shared FilterBar.
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
      .findByLabelText(/subject specialties/i)
      .click({ force: true })
      .closest("div")
      .findByRole("dialog")
      .findByLabelText("Art")
      .click({ force: true })
      .should("be.checked");

    cy.log("Submit the form using the multiselect filter");
    cy.get("form")
      .findByLabelText(/subject specialties/i)
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
});
