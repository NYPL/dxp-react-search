import { testBreadcrumbs } from "../../support/utils";

describe("Section Front: Research Support Page Tests", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/research/support");
  });

  it("should have breadcrumbs with 3 levels, last item is not a link", () => {
    testBreadcrumbs(3, "Support and Services");
  });
});
