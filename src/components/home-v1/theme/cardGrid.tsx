import type { ComponentStyleConfig } from "@chakra-ui/theme";

const CardGrid: ComponentStyleConfig = {
  variants: {
    "row-grid": {
      gridTemplateRows: "1fr 1fr",
      gap: { base: 4, md: 6, xl: 12 },
    },
    "column-grid": {
      gridTemplateRows: { base: "1fr", md: "fr1 fr1", lg: "min-content" },
      gridTemplateColumns: {
        base: "1fr",
        md: "repeat(auto-fit, minmax(267px, 1fr))",
      },
      gap: { base: 7, lg: 6, xl: 7 },
    },
    "updates-grid": {
      gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
      gap: { base: 3, md: 5, lg: 8 },
      listStyleType: "none",
    },
  },
  defaultProps: { variant: "row-grid" },
};

export default CardGrid;
