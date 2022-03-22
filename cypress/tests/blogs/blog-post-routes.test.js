describe("Blog Post Routes Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Published blog post returns correct page.", () => {
    /*const slug = "/blog/2022/01/24/test-blog-post-1";
    cy.visit(`http://localhost:3000${slug}`);
    cy.findByRole("heading", {
      name: /test blog post 1/i,
    }).should("exist");
    */
  });

  it("Unpublished blog post with special url returns correct page.", () => {
    // const slug = "/blog/2022/01/24/demo-blog-post-16";
    // const previewUrl = `http://localhost:3000${slug}?preview_secret=o934Ysf3Hpu3irVXFBYvGCAyHjU3F&uuid=d1dcb982-8b39-43de-9aff-a2b2947c6299`;
    // cy.visit(previewUrl);
    // cy.findByRole("heading", {
    //   name: /demo blog post 1\/6/i,
    // }).should("exist");
  });

  it("Unpublished blog post returns 404.", () => {
    // const slug = "/blog/2022/01/24/demo-blog-post-16";
    // cy.visit(`http://localhost:3000${slug}`);
    // cy.findByRole("heading", {
    //   name: /this page could not be found\./i,
    // }).should("exist");
  });

  it("Blog post that does not exist returns 404.", () => {
    // cy.visit("http://localhost:3000/blog/test1234abcd");
    // cy.findByRole("heading", {
    //   name: /this page could not be found\./i,
    // }).should("exist");
  });

  it("Internal redirect goes to correct page.", () => {
    // cy.visit("http://localhost:3000/blog/2022/01/24/internal-redirect");
    // cy.findByRole("heading", {
    //   name: /test blog post 1/i,
    // }).should("exist");
  });

  it("External redirect goes to correct page", () => {
    // const slug = "/blog/2022/01/24/amet-modo";
    // const redirectUrl =
    //   "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys";
    // cy.visit(`http://localhost:3000${slug}`);
    // cy.url().should("eq", redirectUrl);
  });

  /*it("Archived blog post redirects to archive page.", () => {
    const redirectUrl =
      "https://";
    cy.visit("http://localhost:3000/blog/legacy");
    cy.url().should("eq", redirectUrl);
  });
  */
});
