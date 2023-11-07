import getSiteSection from "./get-site-section";

describe("getSiteSection", () => {
  it("should return the correct site section for single level slug.", () => {
    expect(getSiteSection("/press")).toEqual("Press");
  });

  it("should return the correct site section for two level using starts with matching.", () => {
    expect(getSiteSection("/press/press-release-1")).toEqual("Press");
  });

  it("should return the correct site section for multi level slug using starts with matching.", () => {
    expect(
      getSiteSection("/research/collections/articles-databases/search")
    ).toEqual("Articles and Databases");
  });

  it("should return the correct site section for /", () => {
    expect(getSiteSection("/")).toEqual("Home");
  });

  it("should return the correct site section when bundle is passed.", () => {
    expect(getSiteSection("/research", "section_front")).toEqual(
      "Section Front"
    );
  });

  it("should return null if slug does not start with a /", () => {
    expect(getSiteSection("research")).toBeNull();
  });
});
