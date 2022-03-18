import React from "react";
import {
  Icon,
  IconAlign,
  IconColors,
  IconNames,
  IconRotationTypes,
  IconSizes,
  Link,
  LinkTypes,
} from "@nypl/design-system-react-components";
import { MenuItemType as MenuItemProps } from "./MenuTypes";
import s from "./Menu.module.css";

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

  if (link && linkType === "button") {
    return (
      <Link
        type={LinkTypes.Button}
        href={link}
        additionalStyles={{
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
          name={IconNames.Arrow}
          align={IconAlign.Right}
          iconRotation={IconRotationTypes.Rotate270}
          color={IconColors.UiWhite}
          size={IconSizes.Small}
        />
      </Link>
    );
  } else if (link && linkType === undefined) {
    return (
      <>
        <Link type={LinkTypes.Default} className={linkClass} href={link}>
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
