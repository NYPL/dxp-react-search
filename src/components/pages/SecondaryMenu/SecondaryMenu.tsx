import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { MENU_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/menuFields";
// Component
import {
  Box,
  Heading,
  // Button,
} from "@nypl/design-system-react-components";
import MenuItem from "./SecondaryMenuItem";
// Type
import { MenuItem as MenuItemType } from "./Types";

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

interface SecondaryMenuProps {
  id: string;
  parentId?: string;
}

/** This is only a draft to have a visual on /history.
 * Accessibility recommendations for Fly-out menus (if that's the end decision) here: https://www.w3.org/WAI/tutorials/menus/flyout/
 */

function SecondaryMenu({ id, parentId }: SecondaryMenuProps) {
  const showTitle = false;
  const title = "Secondary Nav";
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

  const menu = data.menu.items;

  return (
    <Box py="m">
      <nav aria-labelledby="secondarymenulabel">
        <Heading
          id="secondarymenulabel"
          level="h3"
          size="heading5"
          display={`${showTitle ? "block" : "none"}`}
        >
          {title}
        </Heading>
        <ul style={{ backgroundColor: "var(--nypl-colors-ui-bg-default)" }}>
          {menu.map((item: MenuItemType) => (
            <MenuItem key={item.id} item={item} menuLevel={0} />
          ))}
        </ul>
      </nav>
    </Box>
  );
}
export default SecondaryMenu;
