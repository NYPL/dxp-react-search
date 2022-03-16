// decided to keep this as is for now since this might change if we someday
// replace PageContainer.tsx in components/shared/layouts
// with the Ds TempalteApContainer?
export function testMenus() {
  return cy
    .log(
      "Secondary Content (Sidebar exists) and holds three navgation components"
    )
    .get("#page-container--content-secondary")
    .should("exist")
    .find("nav")
    .should("have.length", 3)
    .log("'More about NYPL' holds links.")
    .findByRole("navigation", {
      name: /more at nypl get a library card find your next book search library locations reserve a computer/i,
    })
    .find("a")
    .should("exist")
    .log("Support NYPL section has a link to Donation page")
    .findByRole("navigation", {
      name: /support nypl volunteer support your library/i,
    })
    .findByRole("link", { name: /Support Your Library/i })
    .should(($link) => {
      expect($link).to.have.css("background-color", "rgb(198, 9, 23)");
    });
}
