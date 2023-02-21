export interface Colorway {
  primary: string;
  secondary: string;
}

export type ColorwayMap = {
  [name: string]: Colorway;
};

// @TODO come up with better solution or naming convention. Section front parent sections share colors,
// and currently its not possible to set a color once, you have to do it for each "parent" group
// route, which is not ideal.
// type SlugOrSection = "/give" | "/research" | "/education" | "section_front";

// slug - specific url
// bundle - specific content type or other.
// group - group of pages within a content type, mainly used for section_front

export default function getColorway(colorwayLabel: string): Colorway {
  const colorwayMap: ColorwayMap = {
    default: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
    "/give": {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
    "/research": {
      primary: "section.research.primary",
      secondary: "section.research.secondary",
    },
    "/research/support": {
      primary: "section.research.primary",
      secondary: "section.research.secondary",
    },
    "/education": {
      primary: "#2540A4",
      secondary: "#1D62E6",
    },
    "/education/educators": {
      primary: "#2540A4",
      secondary: "#1D62E6",
    },
    section_front: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
  };

  return colorwayMap[colorwayLabel] || colorwayMap.default;
}
