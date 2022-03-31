describe("Articles & Databases Individual Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Individual page returns 404 msg and status if route doesn't exist in cms.", () => {
    const slug =
      "/research/collections/articles-databases/slug-that-doesnt-exist";

    cy.log("Check for 404 status code.");
    cy.request({ url: slug, failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
    cy.visit(slug, { failOnStatusCode: false });

    cy.log("Check h1 for 404 message.");
    cy.findByRole("heading", {
      level: 1,
      name: /we're sorry\.\.\./i,
    }).should("exist");
  });

  it("Featured resource returns 404 msg and status if route doesn't exist in cms.", () => {
    const slug =
      "/research/collections/articles-databases/slug-that-doesnt-exist";

    cy.log("Check for 404 status code.");
    cy.request({ url: slug, failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
    cy.visit(slug, { failOnStatusCode: false });

    cy.log("Check h1 for 404 message.");
    cy.findByRole("heading", {
      level: 1,
      name: /we're sorry\.\.\./i,
    }).should("exist");
  });
});
