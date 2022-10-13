// TODO test that pagination only appears when more resluts are more than max per page
export function testPagination() {
  return cy
    .log("Pagination is present.")
    .findByRole("navigation", { name: /pagination/i })
    .should("exist")
    .log("On first page previous link is not present")
    .findByRole("link", { name: /previous page/i })
    .should("not.exist")
    .log("Clicking page 3 link in pagination takes user to page 3")
    .findByRole("link", { name: /page 3/i })
    .click()
    .wait(3000)
    .location()
    .should(($location) => {
      expect($location.search).to.eq("?page=3");
    })
    .log("Clicking next link in pagination takes user to page 4")
    .findByRole("link", { name: /next page/i })
    .click()
    .then(() => {
      cy.location().should(($location) => {
        expect($location.search).to.eq("?page=4");
      });
    })
    .log("Clicking previous link in pagination takes user to page 3")
    .findByRole("link", { name: /previous page/i })
    .click()
    .then(() => {
      cy.location().should(($location) => {
        expect($location.search).to.eq("?page=3");
      });
    });
}
