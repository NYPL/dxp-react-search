import { testBreadcrumbs } from "../../support/utils";

describe("Section Front Support Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/research/support");
  });
  it("Breadcrumbs includes page title as last item and is not a link", () => {
    testBreadcrumbs(3, "Support and Services");
  });
});
