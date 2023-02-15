import { testBreadcrumbs } from "./../../support/utils";

describe("Section Front: Give Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1300, 1000);
    cy.visit("/give");
  });

  it("should have breadcrumbs with correct number of items and last item is not a link.", () => {
    testBreadcrumbs(2, "Give");
  });

  it("should redirect to correct external url when single donation is clicked.", () => {
    cy.log("Check for an input field with a preset value");
    cy.findByRole("textbox", { id: /donation-ways/i })
      .should("exist")
      .should("have.value", "100");

    cy.log("Check for correct redirect url when single donation is chosen");
    cy.findByRole("link", { name: /single donation/i }).click({
      force: true,
    });
    cy.location().should((loc) => {
      expect(loc.search).to.include("&set.DonationLevel=21954&set.Value=10000");
    });
  });

  it("should redirect to correct external url when monthly donation is clicked.", () => {
    cy.findByRole("textbox", { id: /donation-ways/i })
      .should("exist")
      .clear();

    cy.findByRole("textbox", { id: /donation-ways/i }).type("50");
    cy.log(
      "Check for correct redirect url when custom donation is chosen for monthly donations"
    );
    cy.findByRole("link", { name: /monthly donation/i }).click({
      force: true,
    });
    cy.location().should((loc) => {
      expect(loc.search).to.include(
        "&set.DonationLevel=21954&set.Value=5000&set.OptionalRepeat=TRUE"
      );
    });
  });
});
