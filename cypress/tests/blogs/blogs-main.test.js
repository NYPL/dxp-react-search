describe("Blogs Main Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("http://localhost:3000/blogs");
  });

  it("Basic smoke test.", () => {
    cy.log("h1 exists.");
    cy.findByRole("heading", {
      level: 1,
      name: /blog/i,
    }).should("exist");
    cy.log("Hero description exists.");
    cy.findByText(
      /welcome to the new york public library's public blogs, a new space where a small but growing number of librarians, curators and other staff are posting regular dispatches in a variety of languages from their corner of the nypl community\. learn more\./i
    ).should("exist");

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
    cy.log("Featured posts description exist.");
    cy.findByText(
      /take a look at the latest posts from the nypl blog\./i
    ).should("exist");
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
    cy.log("Explore by channel description exists.");
    cy.findByText(
      /the nypl blog channels can help you discover more posts around the topics you care about\. from black culture to women's history and romance to horror–there is something for everyone\./i
    ).should("exist");
    // @TODO Add test for channels list.
  });

  it("Featured blog posts site browsing works as expected.", () => {});
});
