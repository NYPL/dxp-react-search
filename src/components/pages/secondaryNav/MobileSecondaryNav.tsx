import * as React from "react";
const FocusTrap = require("focus-trap-react");
// @Todo: after ds upgrade replace HEading with Scout Heading
import { Button, Box, Icon } from "@nypl/design-system-react-components";
import SecondaryNavItem, { NavItem, ActiveTrailItem } from "./SecondaryNavItem";

interface SecondaryNavProps {
  id: string;
  menuItems: NavItem[];
  menuParentLabel: string;
  activeTrail: ActiveTrailItem[];
  activeItem: ActiveTrailItem;
}

const MobileSecondaryNav = ({
  id,
  menuItems,
  // menuParentLabel,
  activeTrail,
  activeItem,
}: SecondaryNavProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const onToggle = () => {
    setIsExpanded((prevProp) => !prevProp);
  };
  // const onKeyboardToggle = ()
  const currentPageLabel = activeTrail.slice(-1)[0].title;
  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: false,
      }}
      active={isExpanded}
    >
      <Box float={{ base: "unset", md: "right", lg: "unset" }} width="full">
        <Button
          id={id}
          buttonType="secondary"
          aria-expanded={isExpanded}
          aria-label={`menu, current page: ${currentPageLabel}`}
          width="full"
          onClick={onToggle}
          justifyContent="space-between"
          bg="unset !important"
          borderColor="var(--nypl-colors-ui-border-default) !important"
          borderWidth="1px"
        >
          <Box width="full" color="ui.gray.x-dark" textAlign="center">
            Menu
          </Box>
          <Icon
            name="arrow"
            {...(isExpanded && { iconRotation: "rotate180" })}
            size="small"
            color="ui.gray.x-dark"
          />
        </Button>
        <Box
          as="ul"
          display={`${isExpanded ? "block" : "none"}`}
          width={{ base: "unset", md: "348px" }}
          position="absolute"
          zIndex={1}
          bgColor="ui.white"
          right="16px"
          left={{ base: "16px", md: "unset" }}
          overflow="auto"
          border="solid 1px var(--nypl-colors-ui-border-default)"
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === "Escape") {
              onToggle();
            }
          }}
          marginTop="8px"
          sx={{
            listStyle: "none",
            "#activeItem": {
              backgroundColor: "var(--nypl-colors-dark-ui-bg-page)",
              "#activeItem a": {
                fontWeight: "500",
                color: "var(--nypl-colors-ui-white)",
              },
              "#activeItem svg": {
                color: "var(--nypl-colors-ui-white)",
              },
            },
          }}
        >
          {menuItems.map((menuItem) => (
            <li
              key={menuItem.id}
              {...(activeItem !== null &&
                activeItem.title === menuItem.label && { id: "activeItem" })}
            >
              <SecondaryNavItem
                item={menuItem}
                activeTrail={activeTrail}
                menuLevel={0}
                isOpen={isExpanded}
              />
            </li>
          ))}
        </Box>
      </Box>
    </FocusTrap>
  );
};

export default MobileSecondaryNav;
