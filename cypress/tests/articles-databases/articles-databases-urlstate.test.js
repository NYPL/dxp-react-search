/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Articles & Databases Url State Tests", () => {
  const url = "/research/collections/articles-databases/search";
  const queryParams = "?q=new&page=1&subject=64&audience_by_age=216";
  const queryParamsMultiple =
    "?q=new&subject=64+62&audience_by_age=216+217&availability=on-site-only&page=1";

  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("should prepopulate search form with query param value.", () => {
    cy.visit(`${url}${queryParams}`);
    cy.get("form")
      .findByLabelText("Search for broad subject terms or database by name.")
      .should("have.value", "new");
  });

  it("should preselect single item in subjects multiselect.", () => {
    cy.visit(`${url}${queryParams}`);

    cy.findByRole("button", { name: /subjects/i }).click();
    cy.findByRole("checkbox", { name: "Art" }).should("be.checked");
    cy.findByRole("button", { name: "Subjects (1)" }).should("be.visible");
  });

  it("should preselect multiple items in subjects multiselect.", () => {
    cy.visit(`${url}${queryParamsMultiple}`);

    cy.findByRole("button", { name: /subjects/i }).click();
    cy.findByRole("checkbox", { name: "Art" }).should("be.checked");
    cy.findByRole("checkbox", { name: "Architecture" }).should("be.checked");
    cy.findByRole("button", { name: "Subjects (2)" }).should("be.visible");
  });

  it("it should remove subjects query param only when subjects multiselect clear button is pressed.", () => {
    cy.visit(`${url}${queryParams}`);

    cy.findByRole("button", { name: /subjects/i }).click();
    cy.findByRole("button", { name: "Clear" }).should("be.visible").click();

    cy.log("Verify that the url has been updated correctly.");
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?q=new&page=1&audience_by_age=216");
      expect(loc.pathname).to.eq(
        "/research/collections/articles-databases/search"
      );
    });
  });

  it("should preselect single item in audience multiselect.", () => {
    cy.visit(`${url}${queryParams}`);

    cy.findByRole("button", { name: /audience/i }).click();
    cy.findByRole("checkbox", { name: "Adults" }).should("be.checked");
    cy.findByRole("button", { name: "Audience (1)" }).should("be.visible");
  });

  it("should remove audience query param only when audience multiselect clear button is pressed.", () => {
    cy.visit(`${url}${queryParams}`);

    cy.findByRole("button", { name: /audience/i }).click();
    cy.findByRole("button", { name: "Clear" }).should("be.visible").click();

    cy.log("Verify that the url has been updated correctly.");
    cy.location().should((loc) => {
      expect(loc.search).to.eq("?q=new&page=1&subject=64");
      expect(loc.pathname).to.eq(
        "/research/collections/articles-databases/search"
      );
    });
  });
});
