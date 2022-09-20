describe("Blogs Main Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/blog");
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
      name: /view all blog posts/i,
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

  it("should navigate to blogs all pg when view blog posts in clicked.", () => {
    cy.log("click view all posts link");
    cy.findByRole("link", {
      name: /view all blog posts/i,
    })
      .should("exist")
      .click();
    cy.log("should be blogs all pg");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/blog/all");
    });
  });

  it("should navigate to channels pg when view channels in clicked.", () => {
    cy.log("click view all channels link");
    cy.findByRole("link", {
      name: /view all channels/i,
    })
      .should("exist")
      .click();
    cy.log("should be channels all pg");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/blog/channels");
    });
  });
});
