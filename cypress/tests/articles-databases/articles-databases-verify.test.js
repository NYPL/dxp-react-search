describe("Articles & Databases Verify Page", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("should return 404 page if id query param is not in url.", () => {
    const url = "/research/collections/articles-databases/verify";

    cy.request({ url: url, failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
    cy.visit(url, { failOnStatusCode: false });
  });

  it("should return verify card form if id is present in url.", () => {
    cy.visit(
      "/research/collections/articles-databases/verify?uuid=de2232f4-709a-433f-ae58-83d0e5666d6b"
    );

    cy.findByRole("heading", {
      name: /login to use this database/i,
    });

    cy.findByRole("textbox", {
      name: /library card number/i,
    });
  });
});
