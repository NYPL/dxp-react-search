import { DrupalJsonApiTextField } from "./../drupal-types";

type DrupalJsonApiButtonLinksParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_erm_button_links: DrupalJsonApiButtonLinkParagraph[];
};

export type DrupalJsonApiButtonLinkParagraph = {
  id: string;
  field_lts_icon: string;
  field_ls_link: { title: string; uri: string; url: string };
};

export const ButtonLinksResolver = {
  ButtonLinks: {
    id: (parent: DrupalJsonApiButtonLinksParagraph) => parent.id,
    type: () => "button_links",
    heading: (parent: DrupalJsonApiButtonLinksParagraph) =>
      parent.field_ts_heading,
    description: (parent: DrupalJsonApiButtonLinksParagraph) =>
      parent.field_tfls_description?.processed,
    items: (parent: DrupalJsonApiButtonLinksParagraph) =>
      parent.field_erm_button_links,
  },
  ButtonLink: {
    id: (parent: DrupalJsonApiButtonLinkParagraph) => parent.id,
    icon: (parent: DrupalJsonApiButtonLinkParagraph) => parent.field_lts_icon,
    link: (parent: DrupalJsonApiButtonLinkParagraph) => {
      return {
        title: parent.field_ls_link.title,
        uri: parent.field_ls_link.uri,
        url: parent.field_ls_link.url,
      };
    },
  },
};
