import React from "react";
import { Icon, Link } from "@nypl/design-system-react-components";
import { MenuItemType as MenuItemProps } from "./MenuTypes";
import s from "./Menu.module.css";

function MenuItem({
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

  if (link && linkType === "button") {
    return (
      <Link
        type="button"
        href={link}
        // additionalStyles
        sx={{
          display: "block",
          width: "fit-content",
          marginTop: "var(--nypl-space-xs)",
          background: "brand.primary",
          _hover: {
            background: "brand.secondary",
          },
        }}
      >
        {title}
        <Icon
          name="arrow"
          align="right"
          iconRotation="rotate270"
          color="ui.white"
          size="small"
        />
      </Link>
    );
  } else if (link && linkType === undefined) {
    return (
      <>
        <Link type="default" className={linkClass} href={link}>
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
