import { DrupalJsonApiTextField } from "./../drupal-types";
import getColorway from "./../../../../utils/get-colorway";

type DrupalJsonApiExternalSearchParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_lts_search_type: "catalog" | "research_catalog" | "website" | "vega";
  field_ts_placeholder: string;
  parent_node: { id: string; uuid: string; bundle: string; slug: string };
};

export const externalSearchResolver = {
  ExternalSearch: {
    id: (parent: DrupalJsonApiExternalSearchParagraph) => parent.id,
    type: () => "external_search",
    title: (parent: DrupalJsonApiExternalSearchParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: DrupalJsonApiExternalSearchParagraph) =>
      parent.field_tfls_description?.processed,
    searchType: (parent: DrupalJsonApiExternalSearchParagraph) =>
      parent.field_lts_search_type,
    formPlaceholder: (parent: DrupalJsonApiExternalSearchParagraph) =>
      parent.field_ts_placeholder,
    colorway: (parent: DrupalJsonApiExternalSearchParagraph) =>
      parent.parent_node.bundle === "section_front"
        ? getColorway("section_front")
        : null,
  },
};
