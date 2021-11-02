/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Articles & Databases pages with default query params", () => {
  const url =
    "http://localhost:3000/research/collections/articles-databases/search";
  const queryParams = "?q=new&page=1&subject=64&audience_by_age=216";
  const queryParamsMultiple =
    "?q=new&subject=64+62&audience_by_age=216+217&availability=on-site-only&page=1";

  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Search form should be pre-populated with query param value.", () => {
    cy.visit(`${url}${queryParams}`);
    cy.get("form")
      .findByLabelText("Search for broad subject terms or database by name.")
      .should("have.value", "new");
  });

  it("Subjects multiselect should be pre-populated with Art", () => {
    cy.visit(`${url}${queryParams}`);
    cy.get("form")
      .findByRole("button", { name: "Subjects (1)" })
      .click()
      .parent()
      .findByRole("dialog")
      .findByLabelText("Art")
      .should("be.checked");
  });

  it("Multi multiSelects should be prepopulated with selected items.", () => {
    cy.visit(`${url}${queryParamsMultiple}`);
    cy.get("form")
      .findByRole("button", { name: "Subjects (2)" })
      .click()
      .parent()
      .findByRole("dialog")
      .findByLabelText("Art")
      .should("be.checked")
      .parent()
      .findByLabelText("Architecture")
      .should("be.checked");

    /*.closet("div")
      .parent()
      .parent();
      */

    // Audience
    /*cy.get("form")
      .findByRole("button", { name: "Audience (2)" })
      .click()
      .parent()
      .findByRole("dialog")
      .findByLabelText("Adults")
      .should("be.checked")
      .parent()
      .findByLabelText("Kids")
      .should("be.checked");
      */
  });

  it("Audience multiselect should be pre-populated with adults", () => {
    cy.visit(`${url}${queryParams}`);
    cy.get("form")
      .findByRole("button", { name: "Audience (1)" })
      .click()
      .parent()
      .findByRole("dialog")
      .findByLabelText("Adults")
      .should("be.checked");
  });

  it("Audience multiselect clear should remove audience query params only.", () => {
    cy.visit(`${url}${queryParams}`);
    cy.get("form")
      .findByRole("button", { name: "Audience (1)" })
      .click()
      .parent()
      .findByRole("dialog")
      .parent()
      .findByRole("button", { name: "Clear" })
      .click()
      // Check that the url has been updated correctly.
      .location()
      .should((loc) => {
        expect(loc.search).to.eq("?q=new&page=1&subject=64");
        expect(loc.pathname).to.eq(
          "/research/collections/articles-databases/search"
        );
      });
  });

  it("Subject multiselect clear should remove subject query params only.", () => {
    cy.visit(`${url}${queryParams}`);
    cy.get("form")
      .findByRole("button", { name: "Subjects (1)" })
      .click()
      .parent()
      .findByRole("dialog")
      .parent()
      .findByRole("button", { name: "Clear" })
      .click()
      // Check that the url has been updated correctly.
      .location()
      .should((loc) => {
        expect(loc.search).to.eq("?q=new&page=1&audience_by_age=216");
        expect(loc.pathname).to.eq(
          "/research/collections/articles-databases/search"
        );
      });
  });
});
