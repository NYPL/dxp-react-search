import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { MENU_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/menuFields";
// @Todo: after ds upgrade replace HEading with Scout Heading
import { Box, Heading, Link } from "@nypl/design-system-react-components";
import SecondaryNavItem, { NavItem, ActiveTrailItem } from "./SecondaryNavItem";
import MobileSecondaryNav from "./MobileSecondaryNav";
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

interface SecondaryNavProps {
  id: string;
  parentId: string;
  activeTrail: ActiveTrailItem[];
}

const SecondaryNav = ({
  id,
  parentId,
  activeTrail,
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
  const activeItem = activeTrail[activeTrail.length - 1];

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
  const menuItems = data.menu.items[0].children;

  return (
    <Box
      as="nav"
      id={id}
      aria-labelledby={`heading-${id}`}
      padding={{ base: "0px", lg: "0px 12px 0pc 12px" }}
      width={{ base: "unset", md: "348px", lg: "unset" }}
      float={{ base: "unset", md: "right", lg: "unset" }}
    >
      <Heading
        id={`heading-${id}`}
        level="h2"
        sx={{
          fontSize: "0.75rem !important",
          fontWeight: "semibold",
        }}
        textAlign={{ base: "center", lg: "start" }}
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
        <MobileSecondaryNav
          id="secondary-menu"
          activeTrail={activeTrail}
          activeItem={activeItem}
          menuItems={menuItems}
          menuParentLabel={menuParent.label}
        />
      ) : (
        // Desktop Menu
        <Box
          as="ul"
          sx={{
            listStyle: "none",
            backgroundColor: "var(--nypl-colors-ui-bg-default)",
            "#activeItem": {
              backgroundColor: "var(--nypl-colors-dark-ui-bg-page)",
              "#activeItem a": {
                fontWeight: "500",
                color: "var(--nypl-colors-ui-white)",
              },
              "#activeItem svg": {
                color: "var(--nypl-colors-ui-white)",
              },
              a: {
                lg: {
                  fontWeight: "500",
                  color: "var(--nypl-colors-ui-white)",
                },
              },
              svg: {
                color: "var(--nypl-colors-ui-white)",
              },
            },
          }}
        >
          {menuItems.map((item: NavItem) => (
            <li key={item.id}>
              <SecondaryNavItem
                item={item}
                menuLevel={0}
                activeTrail={activeTrail}
              />
            </li>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SecondaryNav;
