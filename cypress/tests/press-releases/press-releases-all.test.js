import {
  testBreadcrumbs,
  testMenus,
  testPagination,
} from "./../../support/utils";

describe("Press Release Main/Landing Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/press");
  });

  it("Breadcrumbs includes page title as last item and is not a link", () => {
    testBreadcrumbs(2, "Press Releases");
  });

  it("Hero should include h1 title", () => {
    cy.log("Hero exists.");
    cy.findByTestId("hero-content")
      .should("exist")
      .findByRole("heading", { level: 1 })
      .should("exist")
      .and(($heading) => {
        expect($heading.text()).to.match(/Press Releases/);
      });
  });

  it("Right rail menu should be present in sidebar", () => {
    testMenus();
  });

  it("10 press releases should display on first page", () => {
    cy.get("[id=page-container--content-primary]")
      .get("[class=css-1vubhz0]")
      .should("have.length", 10)
      .should("exist");
  });

  it("Pagination provides navigation to next/previous page", () => {
    testPagination();
  });
});
