import * as React from "react";
const FocusTrap = require("focus-trap-react");
// @Todo: after ds upgrade replace Heading with Scout Heading
import { Button, Box, Icon } from "@nypl/design-system-react-components";
import { SecondaryNavProps } from "./SecondaryNav";
import SecondaryNavItem, { NavItem } from "./SecondaryNavItem";
import SecondaryNavListWrapper from "./SecondaryNavListWrapper";

interface SecondaryNavModalProps
  extends Partial<Omit<SecondaryNavProps, "parentId">> {
  id: string;
  menuItems: NavItem[];
  activeTrailIds: string[];
  currentPath: string;
}

export default function SecondaryNavModal({
  id,
  menuItems,
  activeTrailIds,
  currentPath,
}: SecondaryNavModalProps) {
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
        <SecondaryNavListWrapper
          isExpanded={isExpanded}
          menuLevel={0}
          isMobile
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === "Escape") {
              onToggle();
            }
          }}
        >
          {menuItems.map((menuItem: NavItem) => (
            <li key={menuItem.id}>
              <SecondaryNavItem
                item={menuItem}
                menuLevel={0}
                currentPath={currentPath}
                activeTrailIds={activeTrailIds}
              />
            </li>
          ))}
        </SecondaryNavListWrapper>
      </Box>
    </FocusTrap>
  );
}
