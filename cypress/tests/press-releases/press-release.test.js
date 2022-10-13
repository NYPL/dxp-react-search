import { testBreadcrumbs, testMenus } from "./../../support/utils";

describe("Press Release Individual Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit(
      "/press/schomburg-center-research-black-culture-hosts-10th-annual-black-comic-book-festival"
    );
  });

  it("Basic smoke test.", () => {
    cy.log("h1 exists.");
    cy.findByRole("heading", {
      level: 1,
      name: /schomburg center for research in black culture hosts 10th annual black comic book festival/i,
    }).should("exist");
  });

  it("Sidebar navigation tests.", () => {
    testMenus();
  });

  it("Breadcrumbs includes page title as last item and is not a link", () => {
    testBreadcrumbs(
      3,
      "Schomburg Center for Research in Black Culture Hosts 10th Annual Black Comic Book Festival"
    );
  });

  it("Internal redirect returns 301 status and redirects to correct page.", () => {
    const slug =
      "/press/press-release/may-11-2020/new-york-public-library-performing-arts-acquires-archive-legendary";
    const redirectUrl = `${
      Cypress.config().baseUrl
    }/press/new-york-public-library-performing-arts-acquires-archive-legendary-dance-artist-martha-graham`;

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
});
