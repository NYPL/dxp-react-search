import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { MENU_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/menuFields";
import SecondaryNavWrapper from "./SecondaryNavWrapper";
import SecondaryNavListWrapper from "./SecondaryNavListWrapper";
import SecondaryNavItem, { NavItem } from "./SecondaryNavItem";
import SecondaryNavModal from "./SecondaryNavModal";
// Hook
import useWindowSize from "../../../hooks/useWindowSize";

export const MENU_QUERY = gql`
  ${MENU_FIELDS_FRAGMENT}
  query MenuQuery($id: String, $filter: QueryFilter, $sort: Sort) {
    menu(id: $id, filter: $filter, sort: $sort) {
      items {
        ...MenuFields
        children {
          ...MenuFields
          children {
            ...MenuFields
            children {
              ...MenuFields
            }
          }
        }
      }
    }
  }
`;

export interface SecondaryNavProps {
  id: string;
  parentId: string;
  activeTrailIds: string[];
  currentPath: string;
}

const SecondaryNav = ({
  id,
  parentId,
  activeTrailIds,
  currentPath,
}: SecondaryNavProps): JSX.Element => {
  const [isMobile, setIsMobile] = React.useState<boolean>();
  const windowSize = useWindowSize();

  React.useEffect(() => {
    if (windowSize && windowSize >= 769) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  const { loading, error, data } = useQuery(MENU_QUERY, {
    skip: !id,
    variables: {
      id: "main",
      filter: {
        experimental: true,
        conditions: [
          {
            field: "parent",
            operator: "=",
            value: parentId,
          },
          // {
          //   field: "exclude_root",
          //   operator: "=",
          //   value: "true",
          // },
          // {
          //   field: "min_depth",
          //   operator: "=",
          //   value: "3",
          // },
          // {
          //   field: "max_depth",
          //   operator: "=",
          //   value: "3",
          // },
        ],
        /** Parent filter will query all menu items that are children of the passed value menuItemId
         * and its child items. This filter works in combination with max_depth */
        // Example with highest menu item id passed (Home)
        // parent: {
        //   fieldName: "parent",
        //   operator: "=",
        //   value: `${parentId ? parentId : "standard.front_page"}`,
        // },
        // Example with Education item id passed
        // parent: {
        //   fieldName: "parent",
        //   operator: "=",
        //   value: "menu_link_content:29ed02a2-2729-4d56-bc4e-b420f04dde9a",
        // },
        // Title filter will only bring up the one item matching, no children
        // title: {
        //   fieldName: "conditions][title][value",
        //   operator: "=",
        //   value: "Education",
        // },
      },
    },
  });

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state.
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const menuParent = data.menu.items[0];
  const menuItems: NavItem[] = data.menu.items[0].children;

  // If there are no nested pages - don't render a Secondary Nav
  if (!menuItems) return <></>;

  return (
    <SecondaryNavWrapper id={id} label={menuParent.label}>
      {isMobile ? (
        // Tablet/Mobile Menu
        <SecondaryNavModal
          id="secondary-menu"
          menuItems={menuItems}
          activeTrailIds={activeTrailIds}
          currentPath={currentPath}
        />
      ) : (
        <SecondaryNavListWrapper menuLevel={0}>
          {menuItems.map((menuItem: NavItem) => (
            <li key={menuItem.id}>
              <SecondaryNavItem
                item={menuItem}
                menuLevel={0}
                currentPath={currentPath}
                {...(activeTrailIds?.some(
                  (activeTrailId) => activeTrailId === menuItem.id
                ) && {
                  activeTrailIds: activeTrailIds,
                })}
              />
            </li>
          ))}
        </SecondaryNavListWrapper>
      )}
    </SecondaryNavWrapper>
  );
};

export default SecondaryNav;
