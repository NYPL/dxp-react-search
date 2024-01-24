import * as React from "react";
// Component
import {
  Box,
  Link,
  // Button,
} from "@nypl/design-system-react-components";
import MenuItemWithChildren from "./SecondaryMenuItemWithChildren";
// Type
import {
  MenuItem as MenuItemType,
  MenuItemWithChildren as MenuItemWithChildrenType,
} from "./Types";

interface MenuItemProps {
  item: MenuItemType | MenuItemWithChildrenType;
  menuLevel: number;
}

export default function MenuItem({ item, menuLevel }: MenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    console.log("click", e.target);
  };
  return (
    <li
      style={{
        listStyle: "none",
      }}
    >
      {item.children ? (
        <MenuItemWithChildren
          item={item as MenuItemWithChildrenType}
          menuLevel={menuLevel}
          onClick={handleClick}
        />
      ) : (
        <Box
          paddingY="8px"
          paddingEnd="16px"
          paddingStart={`${menuLevel * 10 + 16}px`}
          sx={{
            _hover: {
              bg: "ui.gray.xxx-dark",
              a: {
                color: "ui.typography.inverse.heading",
                textDecor: "none",
                fontWeight: 500,
              },
              svg: { fill: "ui.typography.inverse.heading" },
            },
          }}
        >
          <Link
            href={item.url}
            aria-expanded="false"
            display="inline"
            color="ui.gray.x-dark"
            textDecor="none"
            onClick={handleClick}
          >
            {item.title}
          </Link>
        </Box>
      )}
    </li>
  );
}
