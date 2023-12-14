import React from "react";
import {
  Heading,
  HeadingLevels,
  HeadingSizes,
  List,
} from "@nypl/design-system-react-components";
import MenuItem from "./MenuItem";
import { MenuItemType } from "./MenuTypes";
// Styles
import s from "./Menu.module.css";

export interface MenuProps {
  /** The id for the menu */
  id: string;
  headingLevel: HeadingLevels;
  headingSize?: HeadingSizes;
  headingDecoration?: boolean;
  headingColor?: string;
  title: string;
  items: MenuItemType[];
  menuItemDecoration?: boolean;
  orientation: string;
}

function Menu({
  id,
  headingLevel,
  headingSize,
  headingDecoration = false,
  headingColor,
  title,
  items,
  menuItemDecoration,
  orientation,
}: MenuProps) {
  const headingId = title.toLowerCase().replace(/\s/g, "-");

  return (
    <nav
      id={id}
      key={id}
      aria-labelledby={headingId}
      className={orientation === "vertical" ? s.vertical : s.horizontal}
    >
      {/* <span style={headingColor ? { color: headingColor } : { color: "black" }}> */}
      <Heading
        className={headingDecoration ? s.underline : ""}
        id={headingId}
        level={headingLevel}
        size={headingSize}
        text={title}
        color={headingColor}
      />
      {/* </span> */}
      <List noStyling type="ul">
        {items.map((item: MenuItemType) => {
          return (
            <li key={item.title.toLowerCase().replace(/\s/g, "-")}>
              <MenuItem
                id={item.title.toLowerCase().replace(/\s/g, "-")}
                title={item.title}
                description={item.description}
                link={item.link}
                linkType={item.linkType}
                menuItemDecoration={menuItemDecoration}
              />
            </li>
          );
        })}
      </List>
    </nav>
  );
}

export default Menu;
