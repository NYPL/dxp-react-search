import * as React from "react";
import { Box, Link } from "@nypl/design-system-react-components";
import SecondaryNavItemWithChildren, {
  ItemWithChildren,
} from "./SecondaryNavItemWithChildren";
//Hook
import useSetFocus from "./useSetFocus";

export interface NavItem {
  id: string;
  label: string;
  url: string;
  parentId: string;
  children?: NavItem[];
}

export type ActiveTrailItem = {
  id: string;
  title: string;
  parent: string;
  activeLink: boolean;
};

interface SecondaryNavItemProps {
  menuLevel: number;
  item: NavItem;
  activeTrail: ActiveTrailItem[];
  isOpen?: boolean;
}

const SecondaryNavItem = ({
  menuLevel,
  item,
  activeTrail,
  isOpen,
}: SecondaryNavItemProps): JSX.Element => {
  const itemRef: React.RefObject<any> = React.useRef(null);
  const activeItem = activeTrail[activeTrail.length - 1];
  const isActiveTrail = activeTrail.some(
    (activeItem) => activeItem.title === item.label && !activeItem.activeLink
  );

  useSetFocus(itemRef, item.label, activeItem?.title, isOpen);

  if (item.children && activeTrail) {
    return (
      <SecondaryNavItemWithChildren
        menuLevel={menuLevel}
        item={item as ItemWithChildren}
        activeTrail={activeTrail}
        isActiveTrail={isActiveTrail}
        isOpen={isOpen}
      />
    );
  }

  return (
    <Box
      {...(activeItem.title === item.label && { id: "activeItem" })}
      paddingY="8px"
      paddingEnd="16px"
      paddingStart={`${menuLevel * 10 + 16}px`}
      width="full"
      sx={{
        _hover: {
          bgColor: {
            lg: `${
              menuLevel === 0
                ? "var(--nypl-colors-ui-bg-hover)"
                : "var(--nypl-colors-ui-bg-default)"
            }`,
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
        {...(activeItem.title === item.label && { "aria-current": "page" })}
        href={item.url}
        ref={itemRef}
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
