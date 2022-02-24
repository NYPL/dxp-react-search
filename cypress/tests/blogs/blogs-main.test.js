describe("Blogs Main Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("http://localhost:3000/blog");
  });

  it("Basic smoke test.", () => {
    cy.log("h1 exists.");
    cy.findByRole("heading", {
      level: 1,
      name: /blog/i,
    }).should("exist");

    // Featured posts.
    cy.log("Featured posts heading exists.");
    cy.findByRole("heading", {
      level: 2,
      name: /featured posts/i,
    }).should("exist");
    cy.log("Featured posts link should exist.");
    cy.findByRole("link", {
      name: /view all blogs/i,
    }).should("exist");
    // @TODO Add test for blogs list.

    // Explore by channel.
    cy.log("Explore by channel heading exists.");
    cy.findByRole("heading", {
      level: 2,
      name: /explore by channel/i,
    }).should("exist");
    cy.log("Explore by channel link exist.");
    cy.findByRole("link", {
      name: /view all channels/i,
    }).should("exist");
    // @TODO Add test for channels list.
  });

  it("Featured blog posts site browsing works as expected.", () => {});
});
