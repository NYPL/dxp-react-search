import getColorway from "./get-colorway";

describe("getColorway", () => {
  it("should return the correct colorway for /give slug.", () => {
    const mockColorway = {
      primary: "brand.primary",
      secondary: "brand.secondary",
    };
    expect(getColorway("/give")).toEqual(mockColorway);
  });

  it("should return the correct colorway when a slug starting with '/research' or the string 'research' was passed.", () => {
    const mockColorway = {
      primary: "section.research.primary",
      secondary: "section.research.secondary",
    };
    expect(getColorway("/research")).toEqual(mockColorway);
    expect(getColorway("/research/support")).toEqual(mockColorway);
    expect(getColorway("/research/collections")).toEqual(mockColorway);
    // Works when the string "research" is passed
    expect(getColorway("research")).toEqual(mockColorway);
  });

  it("should return the correct colorway when a slug starting with '/education' or the string 'education' was passed.", () => {
    const mockColorway = {
      primary: "#2540A4",
      secondary: "#1D62E6",
    };
    expect(getColorway("/education")).toEqual(mockColorway);
    expect(getColorway("/education/educators")).toEqual(mockColorway);
    expect(getColorway("/education/kids")).toEqual(mockColorway);
    expect(getColorway("/education/adults/career-employment")).toEqual(
      mockColorway
    );
    // Works when the string "education" is passed
    expect(getColorway("education")).toEqual(mockColorway);
  });

  it("should return the correct colorway for 'section_front'.", () => {
    const mockColorway = {
      primary: "brand.primary",
      secondary: "brand.secondary",
    };
    expect(getColorway("section_front")).toEqual(mockColorway);
  });

  it("should return the default colorway for any string that does not match a specific colorway.", () => {
    const defaultColorway = getColorway("default");
    const mockColorway = {
      primary: "brand.primary",
      secondary: "brand.secondary",
    };
    expect(defaultColorway).toEqual(mockColorway);
    expect(getColorway("generic-section-front")).toEqual(mockColorway);
    // Default values are returend if the prefix "/" is missing from a slug
    expect(getColorway("research/collections")).toEqual(mockColorway);
    expect(getColorway("education/educators")).toEqual(mockColorway);
  });
});
