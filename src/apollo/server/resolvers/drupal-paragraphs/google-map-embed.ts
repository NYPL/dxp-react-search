type DrupalJsonApiGoogleMapEmbedParagraph = {
  id: string;
  field_ts_embed_code: string;
  field_ts_accessible_description: string;
};

export const googleMapEmbedResolver = {
  GoogleMapEmbed: {
    id: (parent: DrupalJsonApiGoogleMapEmbedParagraph) => parent.id,
    type: () => "google_map_embed",
    embedCode: (parent: DrupalJsonApiGoogleMapEmbedParagraph) =>
      parent.field_ts_embed_code,
    accessibleDescription: (parent: DrupalJsonApiGoogleMapEmbedParagraph) =>
      parent.field_ts_accessible_description,
  },
};
