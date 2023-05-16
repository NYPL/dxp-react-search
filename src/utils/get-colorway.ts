export interface Colorway {
  primary: string;
  secondary: string;
}

export type ColorwayMap = {
  [name: string]: Colorway;
};

// colorLabel can be any of the following:
// slug - specific url
// bundle - specific content type or other.
// group - group of pages within a content type, mainly used for section_front

export default function getColorway(colorwayLabel: string): Colorway {
  let finalColorwayLabel: string;

  // Sanitize passed slugs
  if (colorwayLabel[0] === "/") {
    finalColorwayLabel = colorwayLabel.replace(/^\//, "").split("/")[0];
  } else {
    finalColorwayLabel = colorwayLabel;
  }
  const colorwayMap: ColorwayMap = {
    default: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
    "books-music-movies": {
      primary: "#C60917",
      secondary: "#760000",
    },
    connect: {
      primary: "#737373",
      secondary: "#565656",
    },
    education: {
      primary: "section.education.primary",
      secondary: "section.education.secondary",
    },
    events: {
      primary: "section.whats-on.primary",
      secondary: "section.whats-on.secondary",
    },
    give: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
    "get-help": {
      primary: "#737373",
      secondary: "#565656",
    },
    research: {
      primary: "section.research.primary",
      secondary: "section.research.secondary",
    },
    section_front: {
      primary: "brand.primary",
      secondary: "brand.secondary",
    },
  };

  return colorwayMap[finalColorwayLabel] || colorwayMap.default;
}
