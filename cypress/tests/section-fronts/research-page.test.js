import { testBreadcrumbs } from "../../support/utils";

describe("Section Front Research Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/research");
  });
  it("Breadcrumbs includes page title as last item and is not a link", () => {
    testBreadcrumbs(2, "Research");
  });
  it("Search component redirects with the correct search parameters", () => {
    cy.log("Check for the search input field to be present");
    cy.findByRole("textbox", { name: /search the research catalog/i }).should(
      "exist"
    );
    cy.log("Check for a successful search");
    cy.findByRole("textbox", { name: /search the research catalog/i }).type(
      "New York Art"
    );
    cy.get("#external-search-form-button").click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/research/research-catalog/search");
      expect(loc.search).to.eq("?q=New%20York%20Art");
    });
  });
  it("Email Subscription component", () => {
    cy.log("Check for the email input field to be present");
    cy.findByRole("textbox", { name: /email/i }).should("exist");
    cy.findByRole("button", { name: /submit/i }).should("exist");
    cy.get(
      ' a[href*="https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy"]'
    ).should("contains.text", "privacy policy");
  });
  xit("Email Subscription component allows page visitor to sing up for a newsletter", () => {
    cy.log("Check for email validation ");
    cy.findByRole("textbox", { name: /email/i }).type("Hello");
    cy.findByRole("button", { name: /submit/i })
      .should("exist")
      .click();
    cy.findByRole("form", { id: /email-subscription-form/i }).should("exist");
    cy.log("Check for confirmtaion when subscription was successful");
    cy.findByRole("textbox", { name: /email/i })
      .clear()
      .type("hello@email.com");
    cy.findByRole("button", { name: /submit/i })
      .click()
      .wait(3000);
    cy.findByRole("form", { id: /email-subscription-form/i }).should(
      "not.exist"
    );
    cy.get(`[id^=email-subscription-confirmation-] div`)
      .last()
      .should("exist")
      .then(($confirmation) => {
        expect($confirmation).to.include.text(
          `Thank you! You have successfully subscribed`
        );
      });
  });
  xit("Email Subscription component works in a test environment", () => {
    // @TODO Find out how to make this work
    // Cypress.env({ SALESFORCE_ENABLE: false });
    cy.findByRole("textbox", { name: /email/i }).type("hello@email.com");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("form", { id: /email-subscription-form/i }).should(
      "not.exist"
    );
    cy.get(`[id^=email-subscription-confirmation-] div`)
      .last()
      .should("exist")
      .then(($confirmation) => {
        expect($confirmation).to.include.text(`Test mode ....`);
      });
  });
});
