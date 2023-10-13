import {
  DrupalJsonApiMediaImageResource,
  DrupalJsonApiTextField,
} from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiDonationParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ers_image: DrupalJsonApiMediaImageResource;
  field_ls_link: { url: string };
  field_fs_donation_default_amount: number;
  field_ts_donation_other_level_id: string;
};

export const DonationResolver = {
  Donation: {
    id: (parent: DrupalJsonApiDonationParagraph) => parent.id,
    type: () => "donation",
    title: (parent: DrupalJsonApiDonationParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: DrupalJsonApiDonationParagraph) =>
      parent.field_tfls_description?.processed,
    image: (parent: DrupalJsonApiDonationParagraph) =>
      parent.field_ers_image.data === null
        ? null
        : resolveImage(parent.field_ers_image),
    formBaseUrl: (parent: DrupalJsonApiDonationParagraph) =>
      parent.field_ls_link.url,
    defaultAmount: (parent: DrupalJsonApiDonationParagraph) =>
      parent.field_fs_donation_default_amount,
    otherLevelId: (parent: DrupalJsonApiDonationParagraph) =>
      parent.field_ts_donation_other_level_id,
  },
};
