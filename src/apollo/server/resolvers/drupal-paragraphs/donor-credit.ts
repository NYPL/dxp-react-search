import { DrupalJsonApiTextField } from "./../drupal-types";

type DrupalJsonApiDonorCreditParagraph = {
  id: string;
  field_ts_donor_credit_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_bs_show_border: boolean;
};

export const donorCreditResolver = {
  DonorCredit: {
    id: (parent: DrupalJsonApiDonorCreditParagraph) => parent.id,
    type: () => "donor_credit",
    heading: (parent: DrupalJsonApiDonorCreditParagraph) =>
      parent.field_ts_donor_credit_heading,
    description: (parent: DrupalJsonApiDonorCreditParagraph) =>
      parent.field_tfls_description?.processed,
    showBorder: (parent: DrupalJsonApiDonorCreditParagraph) =>
      parent.field_bs_show_border,
  },
};
