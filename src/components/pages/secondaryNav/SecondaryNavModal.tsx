import * as React from "react";
const FocusTrap = require("focus-trap-react");
import { Button, Box, Icon } from "@nypl/design-system-react-components";
import { SecondaryNavProps } from "./SecondaryNav";
import SecondaryNavList, { NavItem } from "./SecondaryNavList";

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
}: SecondaryNavModalProps): React.ReactElement<SecondaryNavModalProps> {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleToggle = () => {
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
          onClick={handleToggle}
          sx={{
            justifyContent: "space-between",
            width: "full",
            bg: "unset !important",
            borderColor: "var(--nypl-colors-ui-border-default) !important",
            borderWidth: "1px",
            marginBottom: "16px",
          }}
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
        <SecondaryNavList
          menuItems={menuItems}
          menuLevel={0}
          activeTrailIds={activeTrailIds}
          currentPath={currentPath}
          isExpanded={isExpanded}
          isModalView
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === "Escape") {
              handleToggle();
            }
          }}
        />
      </Box>
    </FocusTrap>
  );
}
