import { DrupalJsonApiTextField } from "./../drupal-types";

type DrupalJsonApiTextParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_summary_descrip: DrupalJsonApiTextField;
};

export const TextResolver = {
  Text: {
    id: (parent: DrupalJsonApiTextParagraph) => parent.id,
    type: () => "text",
    heading: (parent: DrupalJsonApiTextParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    text: (parent: DrupalJsonApiTextParagraph) =>
      parent.field_tfls_summary_descrip?.processed,
  },
};
