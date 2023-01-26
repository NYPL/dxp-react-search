import getBreadcrumbsTrail from "./get-breadcrumbs-trail";

describe("getBreadcrumbsTrail", () => {
  // @TODO try to add a NEXT_PUBLIC_NYPL_DOMAIN for testing
  // const env = process.env;

  // beforeEach(() => {
  //   jest.resetModules();
  //   process.env = { ...env };
  // });
  // afterEach(() => {
  //   process.env = env;
  // });
  it("should return the correct breadcrumbs when the slug contains one level", () => {
    const mockBreadcrumbsTrail = [{ text: "Give", url: "undefined/give" }];
    const breadcrumbsTrail = getBreadcrumbsTrail("/give");
    expect(breadcrumbsTrail.length).toEqual(1);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });
  it("shoud return the correct breadcumbs trail if the slug contains two levels", () => {
    const mockBreadcrumbsTrail = [
      { text: "Research", url: "undefined/research" },
      { text: "Support and Services", url: "undefined/research/support" },
    ];
    const breadcrumbsTrail = getBreadcrumbsTrail("/research/support");
    expect(breadcrumbsTrail.length).toEqual(2);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });
  it("shoud return the correct breadcumbs trail if the slug contains three levels", () => {
    // process.env.NEXT_PUBLIC_NYPL_DOMAIN = "https://www.nypl.org";
    const mockBreadcrumbsTrail = [
      { text: "Research", url: "undefined/research" },
      { text: "Support and Services", url: "undefined/research/support" },
      { text: "Give", url: "undefined/research/support/give" },
    ];
    const breadcrumbsTrail = getBreadcrumbsTrail("/research/support/give");
    expect(breadcrumbsTrail.length).toEqual(3);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });
  it("shoud return the correct breadcumbs trail if the slug has no leading sash", () => {
    const mockBreadcrumbsTrail = [
      { text: "Research", url: "undefined/research" },
    ];
    const breadcrumbsTrail = getBreadcrumbsTrail("research");
    expect(breadcrumbsTrail.length).toEqual(1);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });
  it("shoud return the correct breadcumbs trail if the slug has query paramters", () => {
    const mockBreadcrumbsTrail = [
      { text: "Research", url: "undefined/research" },
    ];
    const breadcrumbsTrail = getBreadcrumbsTrail(
      "/research?param=something&anotherparam=217"
    );
    expect(breadcrumbsTrail.length).toEqual(1);
    expect(breadcrumbsTrail).toEqual(mockBreadcrumbsTrail);
  });
  it("shoud return an empty array if the slug is an empty string, undefined or null", () => {
    let breadcrumbsTrail = getBreadcrumbsTrail("");
    expect(breadcrumbsTrail.length).toEqual(0);
    breadcrumbsTrail = getBreadcrumbsTrail(undefined);
    expect(breadcrumbsTrail.length).toEqual(0);
    breadcrumbsTrail = getBreadcrumbsTrail(null);
    expect(breadcrumbsTrail.length).toEqual(0);
  });
});
