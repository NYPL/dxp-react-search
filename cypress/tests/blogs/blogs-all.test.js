/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Blog All pg tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Breadcrumbs includes page title as last item and is not a link", () => {});

  it("Filter bar with 5 multiselects are present", () => {});

  it("10 blog posts should display on first page", () => {
    cy.visit("http://localhost:3000/blog/all");
    cy.log("Get blog collection by test id");
    cy.get("[data-testid=blog-collection]")
      .find("li")
      .should("have.length", 10);
  });

  it("Next page pagination button takes user to page 2", () => {});

  it("Clicking page 3 link in pagination takes user to page 3", () => {});

  it("Filter bar should reset pagination when applied", () => {
    cy.log("Goto blogs all page starting at page 15");
    cy.visit("http://localhost:3000/blog/all?page=15");

    const items = ["Black Culture", "Book Lists"];
    const queryParams = "channel=730+734";

    cy.log("Open multiselect menu");
    cy.get("#blogs__filter-bar")
      .findByRole("button", { name: "Channels" })
      .click();
    // Map over items to select them from multiselect.
    items.map((item) => {
      cy.log("Select item from multiselect");
      cy.get("#multiselect-channel")
        .findByRole("dialog")
        .findByLabelText(item)
        // { force: true } might be necessary here, expained here:
        // https://github.com/chakra-ui/chakra-ui/issues/3955
        .click({ force: true })
        .should("be.checked");
    });

    cy.log("Submit multiselect");
    cy.get("#multiselect-channel")
      .findByRole("button", { name: "Apply Filters" })
      .click();

    cy.log("Pagination should be reset to page 1 in the url");
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?${queryParams}&page=1`);
    });
  });
});
