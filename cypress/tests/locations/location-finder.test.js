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

  it("Advanced search using autosuggestion as search term using example of SNFL.", () => {
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

  it("should return The New York Public Library for the Performing Arts as the first result, if The New York Public Library for the Performing Arts is selected from the autosuggest dropdown.", () => {
    search("performing", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
      autoSuggest: true,
      autoSuggestDownArrowCount: 1,
    })
      .first()
      .findByRole("heading", {
        name: /The New York Public Library for the Performing Arts/i,
      })
      .should("exist");
  });

  it("should return The New York Public Library for the Performing Arts as the first result, if a synonym is used as search term.", () => {
    search("LPA", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
    })
      .first()
      .findByRole("heading", {
        name: /The New York Public Library for the Performing Arts/i,
      })
      .should("exist");
  });

  it("should return Countee Cullen Library as the first result, if Countee Cullen Library is selected from the autosuggest dropdown.", () => {
    search("countee", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
      autoSuggest: true,
      autoSuggestDownArrowCount: 1,
    })
      .first()
      .findByRole("heading", {
        name: /Countee Cullen Library/i,
      })
      .should("exist");
  });

  it("should return Children's Center as the first result, if Children's Center is selected from the autosuggest dropdown.", () => {
    search("Children's center", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
      autoSuggest: true,
      autoSuggestDownArrowCount: 1,
    })
      .first()
      .findByRole("heading", {
        name: /Children's Center/i,
      })
      .should("exist");
  });

  it("should return Stephen A. Schwarzman Building as the first result, if a synonym is used as search term.", () => {
    search("sasb", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
    })
      .first()
      .findByRole("heading", {
        name: /Stephen A. Schwarzman Building/i,
      })
      .should("exist");
  });

  it("should return Schomburg Center for Research in Black Culture as the first result, if Schomburg Center for Research in Black Culture is selected from the autosuggest dropdown.", () => {
    search("schomburg", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
      autoSuggest: true,
      autoSuggestDownArrowCount: 1,
    })
      .first()
      .findByRole("heading", {
        name: /Schomburg Center for Research in Black Culture/i,
      })
      .should("exist");
  });

  it("should return Schomburg Center for Research in Black Culture as the first result, if a synonym is used as search term.", () => {
    search("schomburg", {
      textboxName: /search locations/i,
      resultsId: "#locations-list ul",
    })
      .first()
      .findByRole("heading", {
        name: /Schomburg Center for Research in Black Culture/i,
      })
      .should("exist");
  });
});
