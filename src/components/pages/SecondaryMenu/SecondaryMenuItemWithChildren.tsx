import * as React from "react";
// Component
import {
  Box,
  Link,
  HorizontalRule,
  Icon,
  // Button,
} from "@nypl/design-system-react-components";
import MenuItem from "./SecondaryMenuItem";
// Type
import { MenuItemWithChildren as MenuItemWithChildrenType } from "./Types";

interface MenuItemWithChildremProps {
  item: MenuItemWithChildrenType;
  onClick: React.ReactEventHandler;
  menuLevel: number;
}

const backgroundByLevel = [
  "var(--nypl-colors-ui-bg-default)",
  "var(--nypl-colors-ui-bg-hover)",
  "var(--nypl-colors-ui-gray-semi-medium)",
];
export default function MenuItemWithChildren({
  item,
  onClick,
  menuLevel,
}: MenuItemWithChildremProps) {
  const [isExpanded, setIsExanded] = React.useState(false);
  const toggleMenu = () => {
    setIsExanded(!isExpanded);
  };
  const childrenMenuLevel = menuLevel < 3 ? menuLevel + 1 : 0;
  return (
    <>
      {isExpanded && menuLevel !== 0 && (
        <HorizontalRule m="0" bg="var(--nypl-colors-ui-border-default)" />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        paddingY="8px"
        paddingEnd="16px"
        paddingStart={`${menuLevel * 10 + 16}px`}
        bg={
          isExpanded
            ? backgroundByLevel[childrenMenuLevel]
            : backgroundByLevel[menuLevel]
        }
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
          {...(isExpanded && menuLevel === 0 && { fontWeight: "500" })}
          onClick={onClick}
        >
          {item.title}
        </Link>
        <button
          id={`button-${item.id}`}
          aria-expanded={isExpanded}
          onClick={toggleMenu}
        >
          <Icon
            name="arrow"
            {...(isExpanded && { iconRotation: "rotate180" })}
            size="small"
            color="ui.black"
            alignSelf="center"
          />
        </button>
      </Box>
      <>
        {isExpanded && (
          <HorizontalRule m="0" bg="var(--nypl-colors-ui-border-default)" />
        )}
        <ul
          style={{
            width: "100%",
            display: `${isExpanded ? "block" : "none"}`,
            margin: "0px",
            backgroundColor: `${
              isExpanded
                ? backgroundByLevel[childrenMenuLevel]
                : backgroundByLevel[menuLevel]
            }`,
          }}
        >
          {item.children.map((child: any) => (
            <MenuItem
              key={child.id}
              item={child}
              menuLevel={childrenMenuLevel}
            />
          ))}
        </ul>
        {isExpanded && (
          <HorizontalRule m="0" bg="var(--nypl-colors-ui-border-default)" />
        )}
      </>
    </>
  );
}
