import { fillRequestVisitForm } from "./../../support/utils";

describe("Locations Local: Request a Visit", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("http://localhost:3000/locations/request-visit");
  });

  it("Load the request visit page.", () => {
    cy.findByRole("heading", {
      level: 1,
      name: /request a class visit or group tour/i,
    }).should("exist");
  });

  it("Form validation should work.", () => {
    cy.log("Submit form without filling out any fields");
    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    cy.log("Form validation should display main error msg");
    cy.findByText(
      /there was a problem with your submissions\. errors have been highlighted below\./i
    ).should("exist");

    cy.log("Select library field should display error msg");
    cy.findByText("Please select a library for your visit.").should("exist");

    cy.log("Visit type field should display error msg");
    cy.findByText("Visit type is required.").should("exist");

    cy.log("Organization field should display error msg");
    cy.findByText("This field is required.").should("exist");

    cy.log("Age groupfields should display error msg");
    cy.findByText("Please select your age group.").should("exist");

    cy.log("Contact info fields should display error msg");
    cy.findByText("Your name is required.").should("exist");
    cy.findByText("Email is required.").should("exist");
  });

  // @TODO this seems more like a unit test
  it("Select virtual visit type displays correct sub fields.", () => {
    cy.log("Select a visit type");
    cy.findByRole("combobox", {
      name: /please select your visit type/i,
    })
      .select("Virtual Visit")
      .should("have.value", "virtual");

    cy.log("Check that conditional sub fields exists");
    cy.findByText(
      /what services would you like to include in your virtual visit\?/i
    ).should("exist");

    cy.findByRole("combobox", {
      name: /please select your visit type/i,
    })
      .select("Virtual Visit")
      .should("have.value", "virtual");
    cy.findByRole("checkbox", {
      name: /introduction to the library/i,
    }).should("exist");
  });

  // @TODO this seems more like a unit test
  it("Select in person visit type displays correct sub fields.", () => {});

  it("virtual visit sub fields other is disabled if other is not checked", () => {});

  // @TODO this seems more like a unit test
  it("Checking no organization disables org text input", () => {
    cy.log("Find and check no organization checkbox");
    cy.findByRole("checkbox", {
      name: /i’m not with a school or organization\./i,
    })
      .click()
      .should("be.checked");

    cy.log("Assert that text input is now disabled");
    cy.findByRole("textbox", {
      name: /please tell us about your school or organization/i,
    }).should("be.disabled");
  });

  it("Succesful submission of in-person visit type redirects user to confirmation pg.", () => {
    fillRequestVisitForm({ visitType: "in-person" });

    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    // Check page redirect happens
    cy.log("Redirected to confirmation page");
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?id=bronx-library-center`);
      expect(loc.pathname).to.eq("/locations/request-visit/confirmation");
    });

    cy.log("Confirmation page message displays correctly");
    cy.findByRole("heading", {
      name: /thank you!/i,
    });
    cy.findByRole("link", {
      name: /back to bronx library center/i,
    });
  });

  it("Succesful submission of virtual visit type redirects user to confirmation pg.", () => {
    fillRequestVisitForm({ visitType: "virtual" });

    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    // Check page redirect happens
    cy.log("Redirected to confirmation page");
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?id=bronx-library-center`);
      expect(loc.pathname).to.eq("/locations/request-visit/confirmation");
    });
    // Check confirmation page copy is correct.
    cy.log("Confirmation page message displays correctly");
    cy.findByRole("heading", {
      name: /thank you!/i,
    });
    cy.findByRole("link", {
      name: /back to bronx library center/i,
    });
  });

  it("Honeypot catches bots and will block form submission.", () => {
    fillRequestVisitForm({ visitType: "in-person" });

    cy.log("Find and check the honeypot field.");
    cy.get("#notHoom").click({ force: true }).should("be.checked");

    cy.log("Submitting the form.");
    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    cy.log("Check for form validation errors");
    cy.findByText(
      /there was a problem with your submissions\. errors have been highlighted below\./i
    ).should("exist");
  });
});
