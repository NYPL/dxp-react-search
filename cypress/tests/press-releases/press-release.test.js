describe("Press Release Individual Page Tests", () => {
  beforeEach(() => {
    //can test for mobile viewport?
    cy.viewport(1024, 768);
    cy.visit(
      "http://localhost:3000/press/new-york-public-library-celebrates-womens-history-month"
    );
  });

  it("Basic smoke test.", () => {
    cy.log("h1 exists.");
    cy.findByRole("heading", {
      level: 1,
      name: /the new york public library celebrates women’s history month/i,
    }).should("exist");
  });

  //Sidebar
  it("Sidebar navigation tests.", () => {
    cy.log(
      "Secondary Content (Sidebar exists) and holds three navgation components"
    );
    cy.get("#page-container--content-secondary")
      .should("exist")
      .find("nav")
      .should("have.length", 3);
    cy.log("'More about NYPL' holds links.");
    cy.findByRole("navigation", {
      name: /more at nypl get a library card find your next book search library locations reserve a computer/i,
    })
      .find("a")
      .should("exist");
    cy.log("Support NYPL section has a link to Donation page");
    cy.findByRole("navigation", {
      name: /support nypl volunteer support your library/i,
    })
      .find("a", { name: /Support Your Library/i })
      .should("exist")
      .and("has.css", "background-color");
  });

  //Breadcumbs
  it("Breadcumbs navigation tests.", () => {
    cy.log("Breadcumbs nav bar is present on page)");
    cy.findByRole("navigation", {
      name: /breadcrumb/i,
    }).should("exist");
    cy.log("Breadcumbs contain navigation to Home and Press Releases)");
    cy.findByRole("navigation", {
      name: /breadcrumb/i,
    })
      .find("a")
      .should("have.length", 2)
      .and(($a) => {
        expect($a[0].innerText).to.match(/Home/);
        expect($a[1].innerText).to.match(/Press Releases/);
      });
    cy.log(
      "Breadcumbs's last entry is the title of the press release and not a link)"
    );
    cy.findByRole("heading", {
      level: 1,
    })
      .should(($heading) => {
        const text = $heading.text();
      })
      .then((text) => {
        cy.findByRole("navigation", {
          name: /breadcrumb/i,
        })
          .find("span", {
            name: /text/i,
          })
          .should("exist");
      });
  });
});
