import { testBreadcrumbs, testMenus } from "./../../support/utils";

describe("Press Release Individual Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/press/new-york-public-library-celebrates-womens-history-month");
  });

  it("Basic smoke test.", () => {
    cy.log("h1 exists.");
    cy.findByRole("heading", {
      level: 1,
      name: /the new york public library celebrates women’s history month/i,
    }).should("exist");
  });

  it("Sidebar navigation tests.", () => {
    testMenus();
  });

  it("Breadcrumbs includes page title as last item and is not a link", () => {
    testBreadcrumbs(
      3,
      "The New York Public Library Celebrates Women’s History Month"
    );
  });
});
