import { Button, Box, Link, Icon } from "@nypl/design-system-react-components";
import {
  backgroundByLevel,
  backgroundByLevelMobile,
} from "./SecondaryNavListWrapper";
import { NavItem } from "./SecondaryNavItem";

interface SecondaryNavParentItemProps {
  item: NavItem;
  menuLevel: number;
  isExpanded: boolean;
  isCurrentMenuItem: boolean;
  onToggle: () => void;
}
export default function SecondaryNavParentItem({
  item,
  menuLevel,
  isExpanded,
  isCurrentMenuItem,
  onToggle,
}: SecondaryNavParentItemProps) {
  const childMenuLevel = menuLevel + 1;
  const { id, label, url } = item;
  return (
    <Box
      {...(isCurrentMenuItem && { id: "activeItem" })}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "8px",
        paddingEnd: "16px",
        paddingStart: `${menuLevel * 10 + 16}px`,
        bg: {
          base: `${
            isExpanded ? "ui.bg.default" : backgroundByLevelMobile[menuLevel]
          }`,
          lg: `${
            isExpanded
              ? backgroundByLevel[childMenuLevel]
              : backgroundByLevel[menuLevel]
          }`,
        },
        borderTop: {
          base:
            isExpanded && menuLevel !== 0
              ? "solid 1px var(--nypl-colors-ui-bg-default)"
              : "unset",
          lg:
            isExpanded && menuLevel !== 0
              ? "var(--nypl-colors-ui-border-default)"
              : "unset",
        },
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
        href={url}
        {...(isCurrentMenuItem && { "aria-current": "page" })}
        color="ui.gray.x-dark"
        fontWeight={{
          base: `${isExpanded && "500"}`,
          lg: `${isExpanded && menuLevel === 0 && "500"}`,
        }}
        sx={{
          _visited: { color: "ui.gray.x-dark" },
        }}
        textDecor="none"
        width="full"
      >
        {label}
      </Link>
      <Button
        id={`menu-item-toggle-button-${id}`}
        aria-expanded={isExpanded}
        onClick={onToggle}
        buttonType="text"
        padding="0px"
        h="24px"
        w="24px"
        minW="24px"
        minH="24px"
        _hover={{ bgColor: "inherit" }}
      >
        <span
          style={{
            height: "1px",
            width: "1px",
            overflow: "hidden",
            position: "absolute",
          }}
        >{`submenu of ${label}`}</span>
        <Icon
          name="arrow"
          {...(isExpanded && { iconRotation: "rotate180" })}
          size="small"
          color="ui.gray.x-dark"
        />
      </Button>
    </Box>
  );
}
