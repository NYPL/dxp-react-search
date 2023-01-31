import getColorway from "./get-colorway";

describe("getColorway", () => {
  it("should return correct colorway for /give slug.", () => {
    const mockColorway = {
      primary: "brand.primary",
      secondary: "brand.secondary",
    };
    expect(getColorway("/give")).toEqual(mockColorway);
  });

  it("should return correct colorway for /research slug.", () => {
    const mockColorway = {
      primary: "section.research.primary",
      secondary: "section.research.secondary",
    };
    expect(getColorway("/research")).toEqual(mockColorway);
  });

  it("should return correct colorway for a section.", () => {
    const mockColorway = {
      primary: "brand.primary",
      secondary: "brand.secondary",
    };
    expect(getColorway("section_front")).toEqual(mockColorway);
  });
});
