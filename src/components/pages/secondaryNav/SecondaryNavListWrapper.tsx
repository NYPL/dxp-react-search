import { Box } from "@nypl/design-system-react-components";
import { BoxProps } from "@chakra-ui/react";

export const backgroundByLevel = [
  "var(--nypl-colors-ui-bg-default)",
  "var(--nypl-colors-ui-bg-hover)",
  "var(--nypl-colors-ui-gray-semi-medium)",
];
export const backgroundByLevelMobile = [
  "var(--nypl-colors-ui-white)",
  "var(--nypl-colors-ui-white)",
  "var(--nypl-colors-ui-bg-default)",
];

interface SecondaryNavListWrapperProps extends BoxProps {
  children: any;
  menuLevel?: number;
  isExpanded?: boolean;
  isMobile?: boolean;
}
export default function SecondaryNavListWrapper({
  children,
  menuLevel = 0,
  isExpanded = false,
  isMobile = false,
  ...rest
}: SecondaryNavListWrapperProps): React.ReactElement<HTMLUListElement> {
  return (
    <Box
      as="ul"
      {...(isMobile && {
        width: { base: "unset", md: "348px" },
        position: "absolute",
        right: "16px",
        left: { base: "16px", md: "unset" },
        overflow: "auto",
        border: "solid 1px var(--nypl-colors-ui-border-default)",
        zIndex: 1,
      })}
      sx={{
        listStyle: "none",
        display: {
          base: `${isExpanded ? "block" : "none"}`,
          lg: `${menuLevel == 0 ? "block" : isExpanded ? "block" : "none"}`,
        },
        bg: {
          base: backgroundByLevelMobile[menuLevel],
          lg: backgroundByLevel[menuLevel],
        },
        margin: 0,
        borderTop: {
          base:
            menuLevel == 0
              ? "none"
              : `${
                  isExpanded
                    ? "solid 1px var(--nypl-colors-ui-border-default)"
                    : "unset"
                }`,
          lg: `${
            isExpanded
              ? "solid 1px var(--nypl-colors-ui-border-default)"
              : "unset"
          }`,
        },
        borderBottom: `${
          isExpanded
            ? "solid 1px var(--nypl-colors-ui-border-default)"
            : "unset"
        }`,
        "#activeItem": {
          backgroundColor: "var(--nypl-colors-dark-ui-bg-page)",
          a: {
            fontWeight: "500",
            color: "var(--nypl-colors-ui-white)",
          },
          svg: {
            color: "var(--nypl-colors-ui-white)",
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
