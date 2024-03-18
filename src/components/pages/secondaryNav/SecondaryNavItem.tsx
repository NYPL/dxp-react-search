import * as React from "react";
import { Box, Link } from "@nypl/design-system-react-components";
import SecondaryNavItemWithChildren, {
  ItemWithChildren,
} from "./SecondaryNavItemWithChildren";

export interface NavItem {
  id: string;
  label: string;
  url: string;
  parentId: string;
  children?: NavItem[];
}

export interface SecondaryNavItemProps {
  menuLevel: number;
  item: NavItem;
  activeTrailIds?: string[];
  currentPath: string;
}

const SecondaryNavItem = ({
  menuLevel,
  item,
  activeTrailIds,
  currentPath,
}: SecondaryNavItemProps): JSX.Element => {
  const isCurrenMenutItem = currentPath === item.url;
  if (item.children) {
    return (
      <SecondaryNavItemWithChildren
        menuLevel={menuLevel}
        item={item as ItemWithChildren}
        {...(activeTrailIds?.some((id) => id === item.id) && {
          activeTrailIds: activeTrailIds,
          isActiveTrail: true,
        })}
        currentPath={currentPath}
      />
    );
  }

  return (
    <Box
      {...(isCurrenMenutItem && { id: "activeItem" })}
      paddingY="8px"
      paddingEnd="16px"
      paddingStart={`${menuLevel * 10 + 16}px`}
      width="full"
      sx={{
        _hover: {
          bgColor: {
            lg: "ui.gray.medium",
          },
          a: {
            textDecor: "none",
            color: "ui.black",
          },
          "li:hover svg": {
            color: "ui.gray.x-dark",
            fill: "ui.gray.x-dark",
          },
        },
      }}
    >
      <Link
        {...(isCurrenMenutItem && { "aria-current": "page" })}
        href={item.url}
        color="ui.gray.x-dark"
        sx={{
          _visited: { color: "ui.gray.x-dark" },
        }}
        textDecor="none"
        width="full"
      >
        {item.label}
      </Link>
    </Box>
  );
};

export default SecondaryNavItem;
