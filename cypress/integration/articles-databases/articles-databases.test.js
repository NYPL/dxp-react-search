import { basicSearch, advancedSearch } from "./../../support/utils";

describe("Articles & Databases", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("http://localhost:3000/research/collections/articles-databases");
  });

  it("Basic smoke test.", () => {
    cy.log("Page title should exist");
    cy.findByRole("heading", {
      level: 1,
      name: /articles & databases/i,
    }).should("exist");
  });

  it("Basic search.", () => {
    const queryParams = "?q=new+york+times&page=1";
    const pathName = "/research/collections/articles-databases/search";

    basicSearch("new york times", {
      textboxName: /search articles and databases/i,
      resultsId: "#search-results",
    })
      .first()
      .findAllByRole("heading", { name: /New York Times/i })
      .should("exist")
      .location()
      .should((loc) => {
        expect(loc.search).to.eq(queryParams);
        expect(loc.pathname).to.eq(pathName);
      });
  });

  it("Advanced search using autosuggest.", () => {
    const queryParams = "?q=Gale+Directory+Library&page=1";
    const pathName = "/research/collections/articles-databases/search";

    advancedSearch("gale", {
      textboxName: /search articles and databases/i,
      resultsId: "#search-results",
    })
      .first()
      .findAllByRole("heading", { name: /gale directory/i })
      .should("exist")
      .location()
      .should((loc) => {
        expect(loc.search).to.eq(queryParams);
        expect(loc.pathname).to.eq(pathName);
      });
  });

  it("Advanced search using autosuggest and multiselect filter.", () => {
    const queryParams = "?q=New+York+Times+%281980-present%29&page=1";
    const pathName = "/research/collections/articles-databases/search";

    cy.log("Open multiselect");
    cy.findByRole("button", { name: /subjects/i }).click();

    cy.log("Select option from mutliselect");
    cy.get("#multiselect-subject")
      .findByRole("listbox")
      .findByLabelText("Art")
      .click()
      .should("be.checked");

    advancedSearch("new york times", {
      textboxName: /search articles and databases/i,
      resultsId: "#search-results",
    })
      // Get the first result.
      .first()
      .findAllByRole("heading", { name: /New York Times/i })
      .should("exist")
      .location()
      .should((loc) => {
        expect(loc.search).to.eq(queryParams);
        expect(loc.pathname).to.eq(pathName);
      });
  });

  it("Featured resource links take user to correct page.", () => {
    const pathName =
      "/research/collections/articles-databases/featured/homework-help";

    cy.log("Featured resources section should exist.");
    cy.findByRole("heading", {
      level: 2,
      name: /featured resources/i,
    }).should("exist");

    cy.log("Click link to goto featured resource topic page");
    cy.findByText("Homework Help").click();

    cy.log("Confirm featured resource topic page loads correctly.");
    cy.findAllByRole("heading", {
      level: 2,
      name: "Homework Help",
    })
      .should("exist")
      // Check that the url has been updated correctly.
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq(pathName);
      });
  });

  it("Most popular links take user to correct page", () => {
    const pathName = "/research/collections/articles-databases/mango-languages";

    cy.log("Most popular heading should exist.");
    cy.findByRole("heading", {
      level: 2,
      name: /most popular/i,
    }).should("exist");

    cy.log("Click link to goto resource detail page");
    cy.findByText("Mango Languages").click();

    cy.log("Confirm resource page loads correctly.")
      .findByRole("link", {
        name: /mango languages/i,
      })
      .should("exist")
      // Check that the url has been updated correctly.
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq(pathName);
      });
  });

  it("Alphabet navigation take user to correct page", () => {});
});
