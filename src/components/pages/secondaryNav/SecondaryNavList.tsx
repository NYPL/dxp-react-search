import { Box, Link } from "@nypl/design-system-react-components";
import SecondaryNavItemWithChildren, {
  ItemWithChildren,
} from "./SecondaryNavItemWithChildren";

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
export interface NavItem {
  id: string;
  label: string;
  url: string;
  parentId: string;
  children?: NavItem[];
}

interface SecondaryNavListProps {
  id?: string;
  menuItems: NavItem[];
  menuLevel?: number;
  activeTrailIds?: string[];
  currentPath: string;
  isExpanded?: boolean;
  isModalView?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}
export default function SecondaryNavList({
  id,
  menuItems,
  menuLevel = 0,
  activeTrailIds,
  currentPath,
  isExpanded = false,
  isModalView = false,
  onKeyDown,
}: SecondaryNavListProps): React.ReactElement<typeof HTMLUListElement> {
  const secondaryNavListCommonStyles = {
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
        isExpanded ? "solid 1px var(--nypl-colors-ui-border-default)" : "unset"
      }`,
    },
    borderBottom: `${
      isExpanded ? "solid 1px var(--nypl-colors-ui-border-default)" : "unset"
    }`,
    "#activeItem": {
      backgroundColor: "dark.ui.bg.page",
      a: {
        fontWeight: "500",
        color: "ui.white",
      },
      svg: {
        color: "ui.white",
      },
    },
  };

  return (
    <Box
      id={id}
      as="ul"
      sx={secondaryNavListCommonStyles}
      {...(isModalView && {
        width: { base: "unset", md: "348px" },
        position: "absolute",
        right: "16px",
        left: { base: "16px", md: "unset" },
        border: "solid 1px var(--nypl-colors-ui-border-default) !important",
      })}
      onKeyDown={onKeyDown}
    >
      {menuItems.map((menuItem: NavItem) => {
        if (menuItem.children) {
          return (
            <SecondaryNavItemWithChildren
              key={menuItem.id}
              menuLevel={menuLevel}
              item={menuItem as ItemWithChildren}
              {...(activeTrailIds?.some((id) => id === menuItem.id)
                ? {
                    activeTrailIds: activeTrailIds,
                    isActiveTrail: true,
                  }
                : { isActiveTrail: false })}
              currentPath={currentPath}
            />
          );
        } else {
          return (
            <Box
              as="li"
              key={menuItem.id}
              {...(currentPath === menuItem.url && { id: "activeItem" })}
              sx={{
                paddingY: "8px",
                paddingEnd: "16px",
                paddingStart: `${menuLevel * 10 + 16}px`,
                width: "full",
                _hover: {
                  bgColor: {
                    lg: "ui.gray.medium",
                  },
                  a: {
                    textDecor: "none",
                    color: "ui.black",
                  },
                },
              }}
            >
              <Link
                {...(currentPath === menuItem.url && {
                  "aria-current": "page",
                })}
                href={menuItem.url}
                sx={{
                  display: "flex",
                  textDecor: "none",
                  width: "full",
                  color: "ui.gray.x-dark",
                  _visited: { color: "ui.gray.x-dark" },
                }}
              >
                {menuItem.label}
              </Link>
            </Box>
          );
        }
      })}
    </Box>
  );
}
