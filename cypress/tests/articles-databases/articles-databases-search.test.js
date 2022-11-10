describe("Articles & Databases Search Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/research/collections/articles-databases/search");
  });

  it("Availability multiselect filter is populated with custom data.", () => {
    cy.log("Open multiselect menu by clicking its button");
    cy.get("form").findByRole("button", { name: "Availability" }).click();
    cy.log("Find the open multiselect and check for items");
    cy.get("#availability")
      .findByRole("dialog")
      .within(() => {
        cy.findByLabelText(/available everywhere/i).should("exist");
        cy.findByLabelText(/offsite with library card/i).should("exist");
        cy.findByLabelText(/on\-site access only/i).should("exist");
      });
  });

  it("Checking a single multiselect item updates selectedItems count to 1.", () => {
    cy.log("Open multiselect menu");
    cy.get("form").findByRole("button", { name: "Subjects" }).click();

    cy.log("Select item from multiselect");
    cy.get("#subject")
      .findByRole("dialog")
      .findByLabelText("Art")
      // { force: true } might be necessary here, expained here:
      // https://github.com/chakra-ui/chakra-ui/issues/3955
      .click({ force: true })
      .should("be.checked");

    cy.log("Confirm that selected item count is correct");
    cy.get("#subject")
      .findByRole("button", { name: "1 item selected" })
      .should("exist");
  });

  it("Checking two multiselect items updates query params correctly.", () => {
    const items = ["Art", "Design"];
    const queryParams = "subject=64+94";

    cy.log("Open multiselect menu");
    cy.get("form").findByRole("button", { name: "Subjects" }).click();

    items.map((item) => {
      cy.log("Select item from multiselect");
      cy.get("#subject")
        .findByRole("dialog")
        .findByLabelText(item)
        // { force: true } might be necessary here, expained here:
        // https://github.com/chakra-ui/chakra-ui/issues/3955
        .click({ force: true })
        .should("be.checked");
    });

    cy.log("Submit multiselect");
    cy.get("#subject").findByRole("button", { name: "Apply" }).click();

    cy.log("Confirm url state is updated correctly");
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?q=&${queryParams}&page=1`);
      expect(loc.pathname).to.eq(
        "/research/collections/articles-databases/search"
      );
    });
  });

  // @TODO
  // RENO-2336 Bug:
  // Given I am on Online Resources page
  // And I select one subject on the Subject filter
  // And I click "Apply Filter" button in Subject filter
  // Then page will indicate that 1 filter is selected with text "Subject (1)"
  // When I deselect the selected Subject filter
  // And I click "Apply Filter" button in Subject filter
  // Then page will indicate that 1 filter is selected with text "Subject(1)"
});
