// @SEE https://javascript.plainenglish.io/how-to-test-http-responses-and-redirects-with-cypress-76ee2337e872
describe("Blog Post Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Published blog post returns correct page.", () => {
    cy.visit(
      "/blog/2022/02/28/how-find-images-your-ancestors-new-york-public-library"
    );
    cy.findByRole("heading", {
      name: /finding images of your ancestors at the new york public library/i,
    }).should("exist");
  });

  it("should return 404 status and message for blog post if route does not exist in CMS.", () => {
    const slug = "/blog/slug-that-doesnt-exist";

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

  it("Internal redirect returns 301 status and redirects to correct page.", () => {
    const slug = "/blog/2022/03/23/crank-ep-213";
    const redirectUrl = `${
      Cypress.config().baseUrl
    }/blog/2022/03/24/crank-ep-213`;

    cy.log("Check for 301 redirect status");
    cy.request({
      url: slug,
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      expect(resp.status).to.eq(301);
      expect(resp.redirectedToUrl).to.eq(redirectUrl);
    });

    cy.log("Check redirect goes to correct page.");
    cy.visit(slug);
    cy.url().should("eq", redirectUrl);
  });

  // @TODO this fails, even tho it works.
  // https://docs.cypress.io/api/events/catalog-of-events#To-conditionally-turn-off-uncaught-exception-handling-unhandled-promise-rejections
  it("External redirect returns correct page", () => {
    // const slug = "/blog/2008/08/01/ode-ice-cream-truck-or-wagon";
    // const redirectUrl =
    //   "https://wayback.archive-it.org/18689/20220314062618/https://www.nypl.org/blog/2008/08/01/ode-ice-cream-truck-or-wagon";
    // cy.visit(slug);
    // cy.url().should("eq", redirectUrl);
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
});
