import { search } from "./../../support/utils";

describe("Locations Local: Request a Visit", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("http://localhost:3000/locations/request-visit");
  });

  it("Load the request visit page.", () => {
    cy.findByRole("heading", {
      level: 1,
      name: /request a group visit/i,
    }).should("exist");
  });

  it("Form validation should work.", () => {
    cy.log("Submit form without filling out any fields");
    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    //cy.log("Form validation should display main error msg");

    cy.log("Select library field should display error msg");
    cy.findByText("Please select a library for your visit.").should("exist");

    cy.log("Visit type field should display error msg");
    cy.findByText("Visit type is required.").should("exist");

    cy.log("Organization field should display error msg");
    cy.findByText("This field is required.").should("exist");

    cy.log("Age groupfields should display error msg");
    cy.findByText("Please select your age group.").should("exist");

    cy.log("Contact info fields should display error msg");
    cy.findByText("Please enter your full name.").should("exist");
    cy.findByText("Please enter your email address.").should("exist");
  });

  // @TODO How in intercept the email api request?
  it("Form submit sends user to confirmation page", () => {
    cy.log("Select a library");
    cy.findByRole("combobox", {
      name: /please select a library/i,
    })
      .select("Allerton Library")
      .should("have.value", "allerton");

    cy.log("Select a visit type");
    cy.findByRole("combobox", {
      name: /please select your visit type/i,
    })
      .select("Virtual Visit")
      .should("have.value", "virtual");

    cy.log("Select virtual visit services");
    cy.findByRole("checkbox", {
      name: /introduction to the library/i,
    })
      .click()
      .should("be.checked");

    cy.log("Enter organizaton name");
    cy.findByRole("textbox", {
      name: /what school or organization are you with\? required/i,
    }).type("Columbia University");

    cy.log("Select age level");
    cy.findByRole("checkbox", {
      name: /adults \(18\+\)/i,
    })
      .click()
      .should("be.checked");

    cy.log("Enter contact info");
    cy.findByRole("textbox", {
      name: /name/i,
    }).type("George Constanza");
    cy.findByRole("textbox", {
      name: /email/i,
    }).type("george@seinfeld.com");

    // Submit
    cy.findByRole("button", {
      name: /submit/i,
    }).click();
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
      name: /what school or organization are you with\?/i,
    }).should("be.disabled");
  });

  //
  it("Succesful submission of in-person visit type redirects user to confirmation pg.", () => {
    cy.log("Select a library");
    cy.findByRole("combobox", {
      name: /please select a library/i,
    })
      .select("Bronx Library Center")
      .should("have.value", "bronx-library-center");

    cy.log("Select a visit type");
    cy.findByRole("combobox", {
      name: /please select your visit type/i,
    })
      .select("In-Person Visit")
      .should("have.value", "in-person");

    cy.log("Select in-person visit services");
    cy.findByRole("radio", {
      name: /group tour/i,
    })
      .click()
      .should("be.checked");

    cy.log("Enter organizaton name");
    cy.findByRole("textbox", {
      name: /what school or organization are you with\? required/i,
    }).type("Columbia University");

    cy.log("Select age level");
    cy.findByRole("checkbox", {
      name: /adults \(18\+\)/i,
    })
      .click()
      .should("be.checked");

    cy.log("Enter contact info");
    cy.findByRole("textbox", {
      name: /name/i,
    }).type("George Costanza");
    cy.findByRole("textbox", {
      name: /email/i,
    }).type("george@seinfeld.com");

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
  });

  it("Succesful submission of virtual visit type redirects user to confirmation pg.", () => {
    cy.log("Select a library");
    cy.findByRole("combobox", {
      name: /please select a library/i,
    })
      .select("Bronx Library Center")
      .should("have.value", "bronx-library-center");

    cy.log("Select a visit type");
    cy.findByRole("combobox", {
      name: /please select your visit type/i,
    })
      .select("Virtual Visit")
      .should("have.value", "virtual");

    cy.log("Select virtual visit services");
    cy.findByRole("checkbox", {
      name: /introduction to the library/i,
    })
      .click()
      .should("be.checked");

    cy.log("Enter organizaton name");
    cy.findByRole("textbox", {
      name: /what school or organization are you with\? required/i,
    }).type("Columbia University");

    cy.log("Select age level");
    cy.findByRole("checkbox", {
      name: /adults \(18\+\)/i,
    })
      .click()
      .should("be.checked");

    cy.log("Enter contact info");
    cy.findByRole("textbox", {
      name: /name/i,
    }).type("George Costanza");
    cy.findByRole("textbox", {
      name: /email/i,
    }).type("george@seinfeld.com");

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
});
