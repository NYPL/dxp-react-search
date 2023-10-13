import { DrupalJsonApiTextField } from "./../drupal-types";

type DrupalJsonApiEmailSubscriptionParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ts_placeholder: string;
  field_ts_salesforce_list_id: string;
  field_ts_salesforce_source_code: string;
};

export const EmailSubscriptionResolver = {
  EmailSubscription: {
    id: (parent: DrupalJsonApiEmailSubscriptionParagraph) => parent.id,
    type: () => "email_subscription",
    heading: (parent: DrupalJsonApiEmailSubscriptionParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: DrupalJsonApiEmailSubscriptionParagraph) =>
      parent.field_tfls_description?.processed,
    formPlaceholder: (parent: DrupalJsonApiEmailSubscriptionParagraph) =>
      parent.field_ts_placeholder,
    salesforceListId: (parent: DrupalJsonApiEmailSubscriptionParagraph) =>
      parent.field_ts_salesforce_list_id,
    salesforceSourceCode: (parent: DrupalJsonApiEmailSubscriptionParagraph) =>
      parent.field_ts_salesforce_source_code,
    // colorway
  },
};
