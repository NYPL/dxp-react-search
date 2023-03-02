import { testBreadcrumbs } from "../../support/utils";
import "@testing-library/cypress/add-commands";

describe("Section Front: Research Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1300, 1000);
    cy.visit("/research");
  });

  it("should have breadcrumbs with correct number of items and last item is not a link.", () => {
    testBreadcrumbs(2, "Research");
  });

  it("should redirect to correct external search with correct query parameters.", () => {
    cy.log("Check for the search input field to be present");
    cy.findByRole("textbox", { name: /search the research catalog/i }).should(
      "exist"
    );

    cy.log("Enter a search term and submit the form");
    cy.findByRole("textbox", { name: /search the research catalog/i }).type(
      "New York Art"
    );
    cy.get("#external-search-form-button").click({ force: true });

    cy.log("Check for a successful search");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/research/research-catalog/search");
      expect(loc.search).to.eq("?q=New%20York%20Art");
    });
  });

  // it("should render an email subscription component with form and related content.", () => {
  //   cy.get(".email-subscription")
  //     .scrollIntoView()
  //     .should("exist")
  //     .findByRole("heading", { level: 2 })
  //     .should("exist")
  //     .log("Check for the email input field to be present")
  //     .findByRole("textbox", { name: /email/i })
  //     .should("exist")
  //     //
  //     .findByRole("button", { name: /submit/i })
  //     .should("exist")
  //     .get(
  //       `a[href*="https://www.nypl.org/help/about-nypl/legal-notices/privacy-policy"]`
  //     )
  //     .should("contains.text", "privacy policy");
  // });

  it("should allow user to submit email subscription form successfully.", () => {
    cy.get(".email-subscription")
      .scrollIntoView()
      .should("exist")
      .log("Find the textbox and enter an email address")
      .findByRole("textbox", {
        name: /email/i,
      })
      .should("exist")
      .type("test@email.com")
      .log("Find the submit button and click it")
      .findByRole("button", {
        name: /submit/i,
      })
      .should("exist")
      .click()
      .log("Check for the confirmation message")
      .findByText(/test mode \.\.\.\./i)
      .should("exist")
      .should("have.focus");
  });

  // xit("Email Subscription component allows page visitor to sing up for a newsletter", () => {
  //   cy.log("Check for email validation ");
  //   cy.findByRole("textbox", { name: /email/i }).type("Hello");
  //   cy.findByRole("button", { name: /submit/i })
  //     .should("exist")
  //     .click();
  //   cy.findByRole("form", { id: /email-subscription-form/i }).should("exist");
  //   cy.log("Check for confirmtaion when subscription was successful");
  //   cy.findByRole("textbox", { name: /email/i })
  //     .clear()
  //     .type("hello@email.com");
  //   cy.findByRole("button", { name: /submit/i })
  //     .click()
  //     .wait(3000);
  //   cy.findByRole("form", { id: /email-subscription-form/i }).should(
  //     "not.exist"
  //   );
  //   cy.get(`[id^=email-subscription-confirmation-] div`)
  //     .last()
  //     .should("exist")
  //     .then(($confirmation) => {
  //       expect($confirmation).to.include.text(
  //         `Thank you! You have successfully subscribed`
  //       );
  //     });
  // });

  // xit("Email Subscription component works in a test environment", () => {
  //   // @TODO Find out how to make this work
  //   // Cypress.env({ SALESFORCE_ENABLE: false });
  //   cy.findByRole("textbox", { name: /email/i }).type("hello@email.com");
  //   cy.findByRole("button", { name: /submit/i }).click();
  //   cy.findByRole("form", { id: /email-subscription-form/i }).should(
  //     "not.exist"
  //   );
  //   cy.get(`[id^=email-subscription-confirmation-] div`)
  //     .last()
  //     .should("exist")
  //     .then(($confirmation) => {
  //       expect($confirmation).to.include.text(`Test mode ....`);
  //     });
  // });
});
