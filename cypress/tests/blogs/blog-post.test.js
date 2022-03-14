describe("Blog Post Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("404 message is returned if route doesn't exist in cms.", () => {
    cy.visit("/blog/slug-that-doesnt-exist");
    cy.log("Check h1 for 404 message.");
    cy.findByRole("heading", {
      level: 1,
      name: /we're sorry\.\.\./i,
    }).should("exist");
  });
});
