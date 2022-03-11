describe("Articles & Databases Individual Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Individual page returns 404 message if route doesn't exist in cms.", () => {
    cy.visit("/research/collections/articles-databases/slug-that-doesnt-exist");
    cy.log("Check h1 for 404 message.");
    cy.findByRole("heading", {
      level: 1,
      name: /we're sorry\.\.\./i,
    }).should("exist");
  });

  // @TODO Move this to a diff file after tests are more built out.
  it("Featured resource returns 404 message if route doesn't exist in cms.", () => {
    cy.visit(
      "/research/collections/articles-databases/featured/slug-that-doesnt-exist"
    );
    cy.log("Check h1 for 404 message.");
    cy.findByRole("heading", {
      level: 1,
      name: /we're sorry\.\.\./i,
    }).should("exist");
  });
});
