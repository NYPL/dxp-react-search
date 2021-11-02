import React from "react";
import { Link, LinkTypes } from "@nypl/design-system-react-components";
import { MenuItemType as MenuItemProps } from "./MenuTypes";
import s from "./Menu.module.css";

/*interface MenuItemProps {
  id: string;
  title: string;
  description?: string;
  link?: string;
  linkType?: LinkTypes;
  menuItemDecoration: boolean;
}
*/

function MenuItem({
  id,
  title,
  description,
  link,
  linkType,
  menuItemDecoration,
}: MenuItemProps) {
  let linkClass = s.link;
  if (!menuItemDecoration && menuItemDecoration !== undefined) {
    linkClass = `${s.link} ${s.noDecoration}`;
  }

  if (link) {
    return (
      <>
        <Link
          type={linkType === "button" ? LinkTypes.Button : LinkTypes.Default}
          className={linkType === "button" ? s.actionLink : linkClass}
          href={link}
        >
          {title}
        </Link>
        {description && <div className={s.description}>{description}</div>}
      </>
    );
  } else {
    return (
      <>
        <span>{title}</span>
        {description && <div className={s.description}>{description}</div>}
      </>
    );
  }
}

export default MenuItem;
