import getBreadcrumbsTrail from "./get-breadcrumbs-trail";

describe("get-breadcrumbs-trail tests", () => {
  it("should return the correct breadcrumbs when the slug contains one level", () => {
    const mockBreadcrumbsTrail = [
      { text: "Give", url: "https://www.nypl.org/give" },
    ];
    const breadcrumbsTrail = getBreadcrumbsTrail("/give");

    expect(breadcrumbsTrail.length).toEqual(1);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });

  it("should return the correct breadcumbs trail if the slug contains two levels", () => {
    const mockBreadcrumbsTrail = [
      { text: "Research", url: "https://www.nypl.org/research" },
      {
        text: "Support and Services",
        url: "https://www.nypl.org/research/support",
      },
    ];

    const breadcrumbsTrail = getBreadcrumbsTrail("/research/support");
    expect(breadcrumbsTrail.length).toEqual(2);

    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });

  it("should return the correct breadcumbs trail if the slug contains three levels", () => {
    const mockBreadcrumbsTrail = [
      { text: "Research", url: "https://www.nypl.org/research" },
      {
        text: "Support and Services",
        url: "https://www.nypl.org/research/support",
      },
      {
        text: "Level 3",
        url: "https://www.nypl.org/research/support/level-3",
      },
    ];

    const breadcrumbsTrail = getBreadcrumbsTrail("/research/support/level-3");

    expect(breadcrumbsTrail.length).toEqual(3);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });
});
