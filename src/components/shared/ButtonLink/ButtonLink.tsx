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
  icon: string;
};

// Lookup table to match drupal strings to the corresponding DS IconNames
const IconTable: Record<string, IconNames> = {
  facebook: "legacySocialFacebook",
  instagram: "socialInstagram",
  twitter: "socialTwitter",
  file_type_doc: "fileTypeDoc",
};

export default function ButtonLink({ id, link, icon }: ButtonLinkProps) {
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
          // Google play logo is not the same height as apple app store logo.
          {...(icon === "google_play" && {
            sx: {
              maxWidth: "185px",
            },
          })}
        />
      </Link>
    );
  }

  return (
    <Box
      id={`button-link-${id}`}
      key={id}
      as="li"
      listStyleType="none"
      w={{ sm: "full", md: "fit-content" }}
    >
      {/* @TODO once we are updating the DS version,
        replace custome style with type="buttonSecondary"
      */}
      <Link
        id={`link-${id}`}
        href={link.url}
        type="action"
        w="full"
        py="xs"
        px="s"
        textDecor="none"
        color="ui.link.primary"
        bg="transparent"
        borderStyle="solid"
        borderWidth="1px"
        borderColor="ui.link.primary"
        _hover={{
          bg: "rgb(5, 118, 211,0.05 )",
          borderColor: "ui.link.secondary",
          color: "ui.link.secondary",
          textDecor: "none",
          svg: {
            color: "ui.link.secondary",
          },
        }}
      >
        <Icon
          name={IconTable[icon]}
          size="small"
          align="left"
          color="ui.link.primary"
        />
        {link.title}
      </Link>
    </Box>
  );
}
