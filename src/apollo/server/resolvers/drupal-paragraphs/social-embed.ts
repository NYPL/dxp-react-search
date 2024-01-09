type DrupalJsonApiSocialEmbedParagraph = {
  id: string;
  field_ts_social_embed: string;
};

export const socialEmbedResolver = {
  SocialEmbed: {
    id: (parent: DrupalJsonApiSocialEmbedParagraph) => parent.id,
    type: () => "social_embed",
    embedCode: (parent: DrupalJsonApiSocialEmbedParagraph) =>
      parent.field_ts_social_embed,
  },
};
