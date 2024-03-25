import * as React from "react";
import {
  Box,
  Link,
  Icon,
  IconNames,
  Logo,
} from "@nypl/design-system-react-components";

export type ButtonLinkProps = {
  id: string;
  link: { title: string; url: string; uri: string };
  buttonType:
    | "buttonPrimary"
    | "buttonSecondary"
    | "buttonPill"
    | "buttonCallout";
  icon: string;
};

// Lookup table to match drupal strings to the corresponding DS IconNames
const IconTable: Record<string, IconNames> = {
  facebook: "legacySocialFacebook",
  instagram: "socialInstagram",
  twitter: "socialTwitter",
  file_type_doc: "fileTypeDoc",
};

export default function ButtonLink({
  id,
  link,
  buttonType,
  icon,
}: ButtonLinkProps) {
  const isAppStoreIcon =
    icon === "apple_app_store" || icon === "google_play" ? true : false;

  if (isAppStoreIcon) {
    const iconName =
      icon === "apple_app_store" ? "appleAppStoreBlack" : "googlePlayBlack";

    return (
      <Link id={`link-${id}`} href={link.url} type="action">
        <Logo
          decorative
          id="logo-id"
          name={iconName}
          size="small"
          maxHeight="48px"
        />
      </Link>
    );
  }

  // Set the icon color based on buttonType.
  const buttonLinkIconColor =
    buttonType === "buttonPrimary" || buttonType === "buttonCallout"
      ? "ui.white"
      : "ui.link.primary";

  return (
    <Box
      id={`button-link-${id}`}
      key={id}
      as="li"
      listStyleType="none"
      w={{ sm: "full", md: "fit-content" }}
    >
      <Link id={`link-${id}`} href={link.url} type={buttonType}>
        {IconTable[icon] && (
          <Icon
            name={IconTable[icon]}
            size="small"
            align="left"
            color={buttonLinkIconColor}
          />
        )}
        {link.title}
      </Link>
    </Box>
  );
}
