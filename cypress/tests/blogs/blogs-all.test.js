describe("Blog All pg tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("Breadcrumbs includes page title as last item and is not a link", () => {});

  it("Hero should include h1 title and description", () => {});

  it("Right rail menu should be present in sidebar", () => {});

  it("Filter bar with 5 multiselects are present", () => {});

  it("Filter bar with selected items from 1 multiselect should update page", () => {});

  it("Filter bar with selected items from several multiselect should update page", () => {});

  it("Filter bar should reset pagination when applied", () => {
    cy.log("Goto blogs all page starting at page 15");
    cy.visit("/blog/all?page=15");

    const items = ["Black Culture", "Book Lists"];
    const queryParams = "channel=730+734";

    cy.log("Open multiselect menu");
    cy.get("#filter-bar-blogs")
      .findByRole("button", { name: "Channels" })
      .click();
    // Map over items to select them from multiselect.
    items.map((item) => {
      cy.log("Select item from multiselect");
      cy.get("#channel")
        .findByRole("dialog")
        .findByLabelText(item)
        // { force: true } might be necessary here, expained here:
        // https://github.com/chakra-ui/chakra-ui/issues/3955
        .click({ force: true })
        .should("be.checked");
    });

    cy.log("Submit multiselect");
    cy.get("#channel").findByRole("button", { name: "Apply" }).click();

    cy.log("Pagination should be reset to page 1 in the url");
    cy.wait(5000);
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?${queryParams}&page=1`);
    });
  });

  it("10 blog posts should display on first page", () => {
    cy.visit("/blog/all");
    cy.log("Get blog collection by test id");
    cy.get("[data-testid=blog-collection]")
      .find("li")
      .should("have.length", 10);
  });

  it("Clicking next link in pagination takes user to page 2", () => {});

  it("Clicking page 3 link in pagination takes user to page 3", () => {
    cy.visit("/blog/all");
    cy.log("Find the pagination component");
    cy.findByRole("navigation", {
      name: /pagination/i,
    }).within(() => {
      cy.log("Find page 3 link");
      cy.findByRole("link", {
        name: "Page 3",
      }).click();
    });
    cy.log("Pagination should be on page 3");
    cy.wait(5000);
    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?page=3`);
    });
  });

  it("Clicking next link in pagination with filters already selected should goto page 2 and retain filter selection", () => {
    cy.log("Goto blogs all page");
    cy.visit("/blog/all?channel=730&page=1");

    cy.log("Find the pagination component");
    cy.findByRole("navigation", {
      name: /pagination/i,
    }).within(() => {
      cy.log("Click next page");
      cy.findByRole("link", {
        name: /next page/i,
      }).click();
    });

    cy.log("Filter id is retained and pagination should be on page 2");
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?channel=730&page=2`);
    });
  });
});
