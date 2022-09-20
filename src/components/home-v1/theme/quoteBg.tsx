// Defines styling fore the Staff Picks Quote background
const QuoteBg = {
  baseStyle: {
    bg: "brand.100",
    zIndex: 0,
    h: "100%",
    w: "auto",
    mr: { base: 14, lg: "75px", xl: "105px" },
    _after: {
      content: "''",
      position: "absolute",
      bottom: "-20px",
      left: "30px",
      borderRightWidth: "20px",
      borderTopWidth: "20px",
      borderStyle: "solid",
      borderBottomColor: "brand.100",
      borderTopColor: "brand.100",
      borderRightColor: "brand.900",
      borderLeftColor: "brand.900",
      display: "block",
      width: "0px",
    },
  },
};

export default QuoteBg;
