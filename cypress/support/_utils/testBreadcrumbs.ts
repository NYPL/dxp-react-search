export function testBreadcrumbs(length: number) {
  return cy
    .log("Breadcumbs nav bar is present on page)")
    .findByRole("navigation", {
      name: /breadcrumb/i,
    })
    .should("exist")
    .log(
      "Breadcumbs contains navigation links for all previsous pages and the title of current page)"
    )
    .findByRole("navigation", {
      name: /breadcrumb/i,
    })
    .findByRole("list")
    .find("li")
    .should("have.length", length)
    .and(($li) => {
      for (let i = 0; i < $li.length; i++) {
        if (i === $li.length - 1) {
          expect($li[i]).to.have.descendants("span");
        } else {
          expect($li[i]).to.have.descendants("a");
        }
      }
    })
    .findByRole("heading", {
      level: 1,
    })
    .should(($heading) => {
      const text = $heading.text();
    })
    .then((text) => {
      cy.findByRole("navigation", {
        name: /breadcrumb/i,
      })
        // @ts-ignore
        .find("span", { name: /\text/ })
        .should("exist");
    });
}
