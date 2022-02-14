import { search } from "./../../support/utils";

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

    search("new york times", {
      textboxName: /search articles and databases/i,
      resultsId: "#search-results",
    })
      // Get the first result.
      .first()
      .findByRole("link", {
        name: /new york times \(1980\-present\)/i,
      })
      .should("exist")
      // Check that the url has been updated correctly.
      .location()
      .should((loc) => {
        expect(loc.search).to.eq(queryParams);
        expect(loc.pathname).to.eq(pathName);
      });
  });

  it("Advanced search using autosuggest.", () => {
    const queryParams = "?q=American+Memory&page=1";
    const pathName = "/research/collections/articles-databases/search";

    search("american memory", {
      textboxName: /search articles and databases/i,
      resultsId: "#search-results",
      autoSuggest: true,
      autoSuggestDownArrowCount: 1,
    })
      // Get the first result.
      .first()
      .findByRole("link", { name: /american memory/i })
      .should("exist")
      // Check that the url has been updated correctly.
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

    cy.log("Check multiselect item");
    // { force: true } might be necessary here, expained here:
    // https://github.com/chakra-ui/chakra-ui/issues/3955
    cy.findByRole("checkbox", { name: "Art" })
      .click({ force: true })
      .should("be.checked");

    search("new york times", {
      textboxName: /search articles and databases/i,
      resultsId: "#search-results",
      autoSuggest: true,
      autoSuggestDownArrowCount: 2,
    })
      // Get the first result.
      .first()
      .findByRole("link", {
        name: /new york times \(1980\-present\)/i,
      })
      .should("exist")
      // Check that the url has been updated correctly.
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
    cy.findByRole("link", {
      name: /homework help/i,
    }).click();

    cy.log("Confirm featured resource topic page loads correctly.");
    cy.findByRole("heading", {
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
    cy.findByRole("link", {
      name: /mango languages/i,
    }).click();

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

  it("Alphabet navigation takes user to correct page", () => {});
});
