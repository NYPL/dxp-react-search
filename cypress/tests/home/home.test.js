describe("Home tests", () => {
  beforeEach(() => {
    cy.viewport(1300, 1000);
  });

  it("should not make a client side network graphql request.", (done) => {
    cy.intercept({
      method: "POST",
      url: "/api/graphql",
    }).as("apiCheck");

    cy.visit("/");

    // @see https://stackoverflow.com/questions/59171600/allow-cy-wait-to-fail
    cy.on("fail", (error) => {
      if (
        error.name === "CypressError" &&
        error.message.includes("apiCheck") &&
        error.message.includes("Timed out")
      ) {
        done();
        return true;
      }
      throw error;
    });

    cy.wait("@apiCheck").then(() => {
      throw new Error("Error! detected a client side network request.");
    });
  });
});
