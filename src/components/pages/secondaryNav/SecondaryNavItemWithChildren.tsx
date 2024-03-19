import * as React from "react";
import SecondaryNavItem, {
  NavItem,
  SecondaryNavItemProps,
} from "./SecondaryNavItem";
import SecondaryNavListWrapper from "./SecondaryNavListWrapper";
import SecondaryNavParentItem from "./SecondaryNavParentItem";

export interface ItemWithChildren extends NavItem {
  children: NavItem[];
}

interface SecondaryNavItemWithChildrenProps extends SecondaryNavItemProps {
  item: ItemWithChildren;
  isActiveTrail?: boolean;
}

const SecondaryNavItemWithChildren = ({
  item,
  menuLevel,
  activeTrailIds,
  currentPath,
  isActiveTrail = false,
}: SecondaryNavItemWithChildrenProps): JSX.Element => {
  const { children } = item;
  const isCurrenMenutItem = currentPath === item.url;
  const isOpen = (!isCurrenMenutItem && isActiveTrail) || false;
  const [isExpanded, setIsExpanded] = React.useState(isOpen);
  const toggleList = () => {
    setIsExpanded((prevProp) => !prevProp);
  };

  const childMenuLevel = menuLevel + 1;

  return (
    <>
      <SecondaryNavParentItem
        item={item}
        menuLevel={menuLevel}
        isExpanded={isExpanded}
        isCurrentMenuItem={isCurrenMenutItem}
        onToggle={toggleList}
      />
      <SecondaryNavListWrapper
        isExpanded={isExpanded}
        menuLevel={childMenuLevel}
      >
        {children.map((child) => (
          <li key={child.id}>
            <SecondaryNavItem
              item={child}
              menuLevel={childMenuLevel}
              {...(activeTrailIds?.some((id) => id === item.id) && {
                isActiveTrail: true,
                activeTrailIds: activeTrailIds,
              })}
              currentPath={currentPath}
            />
          </li>
        ))}
      </SecondaryNavListWrapper>
    </>
  );
};

export default SecondaryNavItemWithChildren;
