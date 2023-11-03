import { DrupalJsonApiTextField } from "./../drupal-types";

type EmailSubscriptionParagraphDrupalJsonApi = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ts_placeholder: string;
  field_ts_salesforce_list_id: string;
  field_ts_salesforce_source_code: string;
};

export const EmailSubscriptionResolver = {
  EmailSubscription: {
    id: (parent: EmailSubscriptionParagraphDrupalJsonApi) => parent.id,
    type: () => "email_subscription",
    heading: (parent: EmailSubscriptionParagraphDrupalJsonApi) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: EmailSubscriptionParagraphDrupalJsonApi) =>
      parent.field_tfls_description?.processed,
    formPlaceholder: (parent: EmailSubscriptionParagraphDrupalJsonApi) =>
      parent.field_ts_placeholder,
    salesforceListId: (parent: EmailSubscriptionParagraphDrupalJsonApi) =>
      parent.field_ts_salesforce_list_id,
    salesforceSourceCode: (parent: EmailSubscriptionParagraphDrupalJsonApi) =>
      parent.field_ts_salesforce_source_code,
    // colorway
  },
};