export interface Colorways {
  primary: string;
  secondary: string;
}

type SlugOrSection = "/give" | "/research" | "section_front";

export default function getColorways(slugOrSection: SlugOrSection): Colorways {
  const colorwaysMap = {
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
    section_front: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
  };

  return colorwaysMap[slugOrSection] || colorwaysMap.default;
}
