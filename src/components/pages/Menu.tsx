import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Component
import { Box, Link, Heading } from "@nypl/design-system-react-components";

export const MENU_QUERY = gql`
  query MenuQuery($id: String, $filter: MenuFilter, $sort: Sort) {
    menuCollection(id: $id, filter: $filter, sort: $sort) {
      items {
        id
        title
        url
        parentId
        children {
          id
          title
          url
          parentId
          children {
            id
            title
            url
            parentId
            children {
              id
              title
              url
              parentId
            }
          }
        }
      }
    }
  }
`;

interface MenuItem {
  id: string;
  parentId: string;
  title: string;
  url: string;
  children?: [MenuItem];
}

interface MenuProps {
  id: string;
}

interface MenuItemProps {
  item: MenuItem;
}

/** This is only a draft to have a visual on /history.
 * Accessibility recommendations for Fly-out menus (if that's the end decision) here: https://www.w3.org/WAI/tutorials/menus/flyout/
 */
const MenuItem = ({ item }: MenuItemProps) => {
  if (item.children) {
    return (
      <li style={{ listStyle: "none" }} className="has-submenu">
        <Link href={item.url}>{item.title}</Link>
        <ul style={{ paddingLeft: "10px" }}>
          {item.children.map((child: any) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li id={item.id} style={{ listStyle: "none" }}>
      <Link href={item.url}>{item.title}</Link>
    </li>
  );
};

function SecondaryMenu({ id }: MenuProps) {
  const { loading, error, data } = useQuery(MENU_QUERY, {
    skip: !id,
    variables: {
      id: "main",
      // I don't think sort works on menu query
      // sort: {
      //   field: "parent",
      //   direction: "ASC",
      // },
      filter: {
        maxDepth: { fieldName: "max_depth", operator: "=", value: "4" },
        // parent: {
        //   fieldName: "parent",
        //   operator: "=",
        //   value: "standard.front_page",
        // },
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

  const menu = data.menuCollection.items;

  return (
    <Box>
      <Heading level="h3" size="heading5">
        Sidebar Menu
      </Heading>
      <nav aria-label="Sub-menu">
        <ul>
          {menu.map((item: MenuItem) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </Box>
  );
}
export default SecondaryMenu;
