import { DrupalJsonApiTextField } from "./../drupal-types";

type DrupalJsonApiExternalSearchParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_lts_search_type: "catalog" | "research_catalog" | "website" | "vega";
  field_ts_placeholder: string;
};

export const ExternalSearchResolver = {
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
    // colorway
  },
};
