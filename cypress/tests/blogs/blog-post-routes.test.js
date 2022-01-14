describe("Blog Post Routes Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Published blog post returns correct page.", () => {
    cy.visit("http://localhost:3000/blogs/test-blog-post-1");
    cy.findByRole("heading", {
      name: /test blog post 1/i,
    }).should("exist");
  });

  it("Unpublished blog post returns 404.", () => {
    cy.visit("http://localhost:3000/blogs/demo-blog-post-16");
    cy.findByRole("heading", {
      name: /this page could not be found\./i,
    }).should("exist");
  });

  it("Blog post that does not exist returns 404.", () => {
    cy.visit("http://localhost:3000/blogs/test1234abcd");
    cy.findByRole("heading", {
      name: /this page could not be found\./i,
    }).should("exist");
  });

  it("Internal redirect goes to correct page.", () => {
    cy.visit("http://localhost:3000/blogs/internal-redirect");
    cy.findByRole("heading", {
      name: /test blog post 1/i,
    }).should("exist");
  });

  it("External redirect goes to correct page", () => {
    const redirectUrl =
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys";
    cy.visit("http://localhost:3000/blogs/amet-modo");
    cy.url().should("eq", redirectUrl);
  });

  /*it("Archived blog post redirects to archive page.", () => {
    const redirectUrl =
      "https://";
    cy.visit("http://localhost:3000/blog/legacy");
    cy.url().should("eq", redirectUrl);
  });
  */
});
