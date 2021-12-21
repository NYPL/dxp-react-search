interface SearchOptions {
  textboxName: string;
  resultsId: string;
  autoSuggest: boolean;
}

export function search(term: string, options: SearchOptions) {
  const { textboxName, resultsId, autoSuggest } = options;

  let typedString = term;
  if (autoSuggest) {
    typedString = `${term}{downarrow}{downarrow}`;
  }

  return cy
    .log(`Searching for: ${term}`)
    .findByRole("textbox", {
      name: textboxName,
    })
    .type(typedString)
    .click()
    .log("Submit the form")
    .get("form")
    .findByRole("button", { name: "Search" })
    .click()
    .wait(3000)
    .get(resultsId)
    .as("getSearchResults");
}

interface RequestVisitFormOptions {
  visitType: string;
}

// Request visit form.
export function fillRequestVisitForm(options: RequestVisitFormOptions) {
  const { visitType } = options;

  cy.log("Select a library")
    .findByRole("combobox", {
      name: /please select a location/i,
    })
    .select("Bronx Library Center")
    .should("have.value", "bronx-library-center");

  if (visitType === "in-person") {
    cy.log("Select a visit type")
      .findByRole("combobox", {
        name: /please select your visit type/i,
      })
      .select("In-Person Visit")
      .should("have.value", "in-person");

    cy.log("Select in-person visit services")
      .findByRole("radio", {
        name: /group tour/i,
      })
      .click({ force: true })
      .should("be.checked");
  }

  if (visitType === "virtual") {
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
      .click({ force: true })
      .should("be.checked");
  }

  cy.log("Enter organizaton name")
    .findByRole("textbox", {
      name: /please tell us about your school or organization/i,
    })
    .type("Columbia University");

  cy.log("Select age level")
    .findByRole("checkbox", {
      name: /adults/i,
    })
    .click({ force: true })
    .should("be.checked");

  cy.log("Enter name")
    .findByRole("textbox", {
      name: /name/i,
    })
    .type("George Costanza");

  cy.log("Enter email")
    .findByRole("textbox", {
      name: /email/i,
    })
    .type("george@seinfeld.com");
}
