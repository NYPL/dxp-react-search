import type { ComponentStyleConfig } from "@chakra-ui/theme";

const CardGrid: ComponentStyleConfig = {
  variants: {
    "row-grid": {
      gap: { base: 4, md: 6, xl: 12 },
      pb: { md: 2, lg: 5 },
    },
    "column-grid": {
      gridTemplateRows: { base: "1fr", md: "min-content" },
      gridTemplateColumns: {
        base: "1fr",
        md: "repeat(auto-fit, minmax(267px, 1fr))",
      },
      gap: { base: 9, md: 6, xl: 7 },
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