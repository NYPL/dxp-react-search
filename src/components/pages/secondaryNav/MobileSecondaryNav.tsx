import * as React from "react";
const FocusTrap = require("focus-trap-react");
// @Todo: after ds upgrade replace Heading with Scout Heading
import { Button, Box, Icon } from "@nypl/design-system-react-components";
import { SecondaryNavProps } from "./SecondaryNav";
import SecondaryNavItem, { NavItem } from "./SecondaryNavItem";

interface MobileSecondaryNavProps
  extends Partial<Omit<SecondaryNavProps, "parentId">> {
  id: string;
  menuItems: NavItem[];
  currentPath: string;
}

const MobileSecondaryNav = ({
  id,
  menuItems,
  activeTrailIds,
  currentPath,
}: MobileSecondaryNavProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const onToggle = () => {
    setIsExpanded((prevProp) => !prevProp);
  };

  return (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: false,
      }}
      active={isExpanded}
    >
      <Box>
        <Button
          id={id}
          buttonType="secondary"
          aria-expanded={isExpanded}
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
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <SecondaryNavItem
                menuLevel={0}
                item={menuItem}
                activeTrailIds={activeTrailIds}
                currentPath={currentPath}
              />
            </li>
          ))}
        </Box>
      </Box>
    </FocusTrap>
  );
};

export default MobileSecondaryNav;
