describe("Articles & Databases Individual Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("should return 404 status and message for a&d individual page if route does not exist in CMS.", () => {
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
      name: /we're sorry \.\.\./i,
    }).should("exist");
  });

  it("should return 404 status and message for a&d featured resource page if route does not exist in CMS.", () => {
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
      name: /we're sorry \.\.\./i,
    }).should("exist");
  });
});
