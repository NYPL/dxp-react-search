import {
  DrupalJsonApiMediaImageResource,
  DrupalJsonApiTextField,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiJumbotronResolverParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ers_image: DrupalJsonApiMediaImageResource;
  field_ers_secondary_image: DrupalJsonApiMediaImageResource;
  field_ls_link: { title: string; uri: string; url: string };
};

export const jumbotronResolver = {
  Jumbotron: {
    id: (parent: DrupalJsonApiJumbotronResolverParagraph) => parent.id,
    type: () => "jumbotron",
    title: (parent: DrupalJsonApiJumbotronResolverParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: DrupalJsonApiJumbotronResolverParagraph) =>
      parent.field_tfls_description?.processed,
    image: (parent: DrupalJsonApiJumbotronResolverParagraph) =>
      parent.field_ers_image.data === null
        ? null
        : resolveImage(parent.field_ers_image),
    secondaryImage: (parent: DrupalJsonApiJumbotronResolverParagraph) =>
      parent.field_ers_secondary_image.data === null
        ? null
        : resolveImage(parent.field_ers_secondary_image),
    link: (parent: DrupalJsonApiJumbotronResolverParagraph) => {
      return {
        title: parent.field_ls_link.title,
        uri: parent.field_ls_link.uri,
        url: parent.field_ls_link.url,
      };
    },
  },
};
