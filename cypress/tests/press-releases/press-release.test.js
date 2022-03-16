import { testBreadcrumbs, testMenus } from "./../../support/utils";

describe("Press Release Individual Page Tests", () => {
  beforeEach(() => {
    //can test for mobile viewport?
    cy.viewport(1024, 768);
    cy.visit(
      "http://localhost:3000/press/new-york-public-library-celebrates-womens-history-month"
    );
  });

  it("Basic smoke test.", () => {
    cy.log("h1 exists.");
    cy.findByRole("heading", {
      level: 1,
      name: /the new york public library celebrates women’s history month/i,
    }).should("exist");
  });

  //Sidebar
  it("Sidebar navigation tests.", () => {
    testMenus();
  });

  //Breadcumbs
  it("Breadcrumbs includes page title as last item and is not a link", () => {
    testBreadcrumbs(3);
  });
});
