import React from "react";
import { Heading, List, ListTypes } from "@nypl/design-system-react-components";
import MenuItem from "./MenuItem";
import { MenuItemType } from "./MenuTypes";
// Styles
import s from "./Menu.module.css";

interface MenuProps {
  /** The id for the menu */
  id: string;
  headingLevel: number;
  headingDecoration: string;
  headingColor?: string;
  title: string;
  items: MenuItemType[];
  menuItemDecoration: boolean;
  orientation: string;
}

function Menu({
  id,
  headingLevel,
  headingDecoration,
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
      className={orientation === "vertical" ? s.vertical : ""}
    >
      <span style={headingColor ? { color: headingColor } : { color: "black" }}>
        <Heading
          className={headingDecoration === "underline" ? s.underline : ""}
          id={headingId}
          level={headingLevel}
          text={title}
        />
      </span>
      <List noStyling type={ListTypes.Unordered}>
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
