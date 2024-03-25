import * as React from "react";
import { Button, Box, Link, Icon } from "@nypl/design-system-react-components";
import { backgroundByLevel, backgroundByLevelMobile } from "./SecondaryNavList";
import SecondaryNavList, { NavItem } from "./SecondaryNavList";

export interface ItemWithChildren extends NavItem {
  children: NavItem[];
}

type ActiveTrailProps =
  | { isActiveTrail: true; activeTrailIds: string[] }
  | { isActiveTrail?: false; activeTrailIds?: never };

type SecondaryNavItemWithChildrenCommonProps = {
  item: ItemWithChildren;
  menuLevel: number;
  currentPath: string;
};
type SecondaryNavItemWithChildrenProps =
  SecondaryNavItemWithChildrenCommonProps & ActiveTrailProps;

export default function SecondaryNavItemWithChildren({
  item,
  menuLevel,
  activeTrailIds,
  currentPath,
  isActiveTrail = false,
}: SecondaryNavItemWithChildrenProps): React.ReactElement<
  typeof HTMLLIElement
> {
  const { id, label, url, children } = item;
  const isCurrentMenuItem = currentPath === item.url;
  const isOpen = !isCurrentMenuItem && isActiveTrail;
  const [isExpanded, setIsExpanded] = React.useState(isOpen);
  const handleToggle = () => {
    setIsExpanded((prevProp) => !prevProp);
  };

  const childMenuLevel = menuLevel + 1;

  return (
    <li>
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
            svg: {
              color: "ui.black",
            },
          },
        }}
      >
        <Link
          href={url}
          {...(isCurrentMenuItem && { "aria-current": "page" })}
          sx={{
            textDecor: "none",
            width: "full",
            color: "ui.gray.x-dark",
            fontWeight: {
              base: `${isExpanded && "500"}`,
              lg: `${isExpanded && menuLevel === 0 && "500"}`,
            },
            _visited: { color: "ui.gray.x-dark" },
          }}
        >
          {label}
        </Link>
        <Button
          id={`menu-item-toggle-button-${id}`}
          aria-expanded={isExpanded}
          onClick={handleToggle}
          buttonType="text"
          sx={{
            padding: "0px",
            h: "24px",
            w: "24px",
            minW: "24px",
            minH: "24px",
            _hover: { bgColor: "inherit" },
          }}
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
      <SecondaryNavList
        menuItems={children}
        menuLevel={childMenuLevel}
        activeTrailIds={activeTrailIds}
        currentPath={currentPath}
        isExpanded={isExpanded}
      />
    </li>
  );
}
