import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { MENU_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/menuFields";
import { Box, Link, Heading } from "@nypl/design-system-react-components";
import SecondaryNavList, { NavItem } from "./SecondaryNavList";
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

export default function SecondaryNav({
  id,
  parentId,
  activeTrailIds,
  currentPath,
}: SecondaryNavProps): React.ReactElement<SecondaryNavProps> {
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

  const menuParent: NavItem = data.menu.items[0];
  const menuItems: NavItem[] = data.menu.items[0].children;

  // If there are no nested pages - don't render a Secondary Nav
  if (!menuItems) return <></>;

  return (
    <Box
      as="nav"
      id={id}
      aria-labelledby={`heading-${id}`}
      sx={{
        padding: { base: "0px", lg: "0px 12px 0pc 12px" },
        width: { base: "unset", md: "348px", lg: "unset" },
        float: { base: "unset", md: "right", lg: "unset" },
      }}
    >
      <Heading
        id={`heading-${id}`}
        level="h2"
        sx={{
          fontSize: "0.75rem !important",
          fontWeight: "semibold",
          textAlign: { base: "center", lg: "start" },
        }}
      >
        {menuParent.label}
      </Heading>
      <Link
        id="skip-secondary-nav"
        href="#page-container--content-primary"
        sx={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          _focus: {
            position: "static",
            left: "0",
            width: "auto",
            height: "auto",
            overflow: "visible",
            textDecoration: "underline",
          },
          _active: {
            position: "static",
            left: "0",
            width: "auto",
            height: "auto",
            overflow: "visible",
            textDecoration: "underline",
          },
        }}
      >
        Skip to Page Content
      </Link>
      {isMobile ? (
        // Tablet/Mobile Menu
        <SecondaryNavModal
          id="secondary-menu-modal"
          menuItems={menuItems}
          activeTrailIds={activeTrailIds}
          currentPath={currentPath}
        />
      ) : (
        <SecondaryNavList
          id="secondary-menu-list"
          menuItems={menuItems}
          activeTrailIds={activeTrailIds}
          currentPath={currentPath}
          menuLevel={0}
        />
      )}
    </Box>
  );
}
