// @Todo: after ds upgrade replace HEading with Scout Heading
import { Box, Heading, Link } from "@nypl/design-system-react-components";

interface SecondaryNavWrapperProps {
  id: string;
  label: string;
  children: React.ReactElement;
}
export default function SecondaryNavWrapper({
  id,
  label,
  children,
}: SecondaryNavWrapperProps) {
  return (
    <Box
      as="nav"
      id={id}
      aria-labelledby={`heading-${id}`}
      sx={{
        padding: { base: "0px", lg: "0px 12px 0pc 12px" },
        width: { base: "unset", md: "348px", lg: "unset" },
        float: { base: "unset", md: "right", lg: "unset" },
      }}
    >
      <Heading
        id={`heading-${id}`}
        level="h2"
        sx={{
          fontSize: "0.75rem !important",
          fontWeight: "semibold",
          textAlign: { base: "center", lg: "start" },
        }}
      >
        {label}
      </Heading>
      <Link
        id="skip-secondary-nav"
        href="#page-container--content-primary"
        sx={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          _focus: {
            position: "static",
            left: "0",
            width: "auto",
            height: "auto",
            overflow: "visible",
            textDecoration: "underline",
          },
          _active: {
            position: "static",
            left: "0",
            width: "auto",
            height: "auto",
            overflow: "visible",
            textDecoration: "underline",
          },
        }}
      >
        Skip to Page Content
      </Link>
      {children}
    </Box>
  );
}
