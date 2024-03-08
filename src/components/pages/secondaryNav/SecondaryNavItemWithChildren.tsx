import * as React from "react";
import { Button, Box, Link, Icon } from "@nypl/design-system-react-components";
import SecondaryNavItem, { NavItem, ActiveTrailItem } from "./SecondaryNavItem";
// Hook
import useSetFocus from "./useSetFocus";

export interface ItemWithChildren extends NavItem {
  children: NavItem[];
}

interface SecondaryNavItemWithChildrenProps {
  item: ItemWithChildren;
  menuLevel: number;
  activeTrail: ActiveTrailItem[];
  isOpen?: boolean;
  isActiveTrail?: boolean;
}

const SecondaryNavItemWithChildren = ({
  item,
  menuLevel,
  activeTrail,
  isOpen,
  isActiveTrail = false,
}: SecondaryNavItemWithChildrenProps): JSX.Element => {
  const itemRef: React.RefObject<any> = React.useRef(null);
  const { id, label, url, children } = item;
  const activeItem = activeTrail ? activeTrail[activeTrail.length - 1] : null;

  const [isExpanded, setIsExpanded] = React.useState(isActiveTrail);
  const toggleList = () => {
    setIsExpanded((prevProp) => !prevProp);
  };

  useSetFocus(itemRef, item.label, activeItem?.title, isOpen);

  const childMenuLevel = menuLevel + 1;
  const backgroundByLevel = [
    "var(--nypl-colors-ui-bg-default)",
    "var(--nypl-colors-ui-bg-hover)",
    "var(--nypl-colors-ui-gray-semi-medium)",
  ];
  const backgroundByLevelMobile = [
    "var(--nypl-colors-ui-white)",
    "var(--nypl-colors-ui-white)",
    "var(--nypl-colors-ui-bg-default)",
  ];

  if (activeItem?.title === item.label && isOpen) {
    itemRef?.current?.focus();
  }

  return (
    <>
      <Box
        {...(activeItem !== null &&
          activeItem.title === item.label && { id: "activeItem" })}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingY="8px"
        paddingEnd="16px"
        paddingStart={`${menuLevel * 10 + 16}px`}
        bg={{
          base: `${
            isExpanded ? "ui.bg.default" : backgroundByLevelMobile[menuLevel]
          }`,
          lg: `${
            isExpanded
              ? backgroundByLevel[childMenuLevel]
              : backgroundByLevel[menuLevel]
          }`,
        }}
        borderTop={{
          base:
            isExpanded && menuLevel !== 0
              ? "solid 1px var(--nypl-colors-ui-bg-default)"
              : "unset",
          lg:
            isExpanded && menuLevel !== 0
              ? "var(--nypl-colors-ui-border-default)"
              : "unset",
        }}
        sx={{
          _hover: {
            bgColor: {
              lg: `${
                !isExpanded && menuLevel === 0
                  ? "var(--nypl-colors-ui-bg-hover)"
                  : "var(--nypl-colors-ui-bg-default)"
              }`,
            },
            a: {
              textDecor: "none",
              color: "ui.gray.x-dark",
            },
          },
        }}
      >
        <Link
          href={url}
          {...(activeItem !== null &&
            activeItem.title === item.label && { "aria-current": "page" })}
          ref={itemRef}
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
          onClick={toggleList}
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
      <Box
        as="ul"
        bg={{
          base: `${
            isExpanded
              ? backgroundByLevelMobile[childMenuLevel]
              : backgroundByLevelMobile[menuLevel]
          }`,
          lg: `${
            isExpanded
              ? backgroundByLevel[childMenuLevel]
              : backgroundByLevel[menuLevel]
          }`,
        }}
        sx={{
          listStyle: "none",
          width: "100%",
          display: `${isExpanded ? "block" : "none"}`,
          margin: "0px",
          borderTop: {
            base: `${
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
      >
        {children.map((child) => (
          <li key={child.id}>
            <SecondaryNavItem
              item={child}
              menuLevel={childMenuLevel}
              activeTrail={activeTrail}
              isOpen={isOpen && isExpanded}
            />
          </li>
        ))}
      </Box>
    </>
  );
};

export default SecondaryNavItemWithChildren;
