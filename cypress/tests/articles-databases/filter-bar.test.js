/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Articles & Databases Filter Bar", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit(
      "http://localhost:3000/research/collections/articles-databases/search"
    );
  });

  it("Checking two multiselect items updates query params correctly.", () => {
    const items = ["Art", "Design"];
    const queryParams = "subject=64+94";

    cy.log("Open multiselect menu");
    cy.get("form").findByRole("button", { name: "Subjects" }).click();

    items.map((item) => {
      cy.log("Select item from multiselect");
      cy.get("#multiselect-subject")
        .findByRole("dialog")
        .findByLabelText(item)
        // { force: true } might be necessary here, expained here:
        // https://github.com/chakra-ui/chakra-ui/issues/3955
        .click({ force: true })
        .should("be.checked");
    });

    cy.log("Submit multiselect");
    cy.get("#multiselect-subject")
      .findByRole("button", { name: "Apply Filters" })
      .click();

    cy.log("Confirm url state is updated correctly");
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?q=&${queryParams}&page=1`);
      expect(loc.pathname).to.eq(
        "/research/collections/articles-databases/search"
      );
    });
  });

  it("Checking a single item updates selectedItems count to 1.", () => {
    cy.log("Open multiselect menu");
    cy.get("form").findByRole("button", { name: "Subjects" }).click();

    cy.log("Select item from multiselect");
    cy.get("#multiselect-subject")
      .findByRole("dialog")
      .findByLabelText("Art")
      // { force: true } might be necessary here, expained here:
      // https://github.com/chakra-ui/chakra-ui/issues/3955
      .click({ force: true })
      .should("be.checked");

    cy.log("Confirm that selected item count is correct");
    cy.get("#multiselect-subject")
      .findByRole("button", { name: "Subjects (1)" })
      .should("exist");
  });

  /*
    RENO-2336 Bug:
    
    Given I am on Online Resources page

    And I select one subject on the Subject filter

    And I click "Apply Filter" button in Subject filter

    Then page will indicate that 1 filter is selected with text "Subject (1)"

    When I deselect the selected Subject filter

    And I click "Apply Filter" button in Subject filter

    Then page will indicate that 1 filter is selected with text "Subject(1)"
  */
});
