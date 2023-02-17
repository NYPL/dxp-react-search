export interface Colorway {
  primary: string;
  secondary: string;
}

export type ColorwayMap = {
  [name: string]: Colorway;
};

type SlugOrSection = "/give" | "/research" | "/education" | "section_front";

export default function getColorway(slugOrSection: SlugOrSection): Colorway {
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
    section_front: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
  };

  return colorwayMap[slugOrSection] || colorwayMap.default;
}
