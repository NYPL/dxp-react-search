import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
import { resolveImage } from "./utils/resolveImage";
import { getIndividualResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";
import getColorway from "./utils/get-colorway";
import { getDrupalParagraphsField } from "./drupal-paragraphs/get-drupal-paragraphs-field";

export const sectionFrontFeaturedContentDrupalParagraphsMap = {
  "paragraph--donation": "Donation",
  "paragraph--jumbotron": "Jumbotron",
};

// If the object is in the json:api response for a paragraphs field, it must have a __resolveType in GQL
// This means that Paragraphs types allowed on a content type must always be in sync with the Scout GQL code.
// Otherwise you will get a `Abstract type "SectionFrontMainContent" must resolve to an Object type at runtime for field "SectionFront.mainContent".`
export const sectionFrontMainContentDrupalParagraphsMap = {
  "paragraph--button_links": "ButtonLinks",
  "paragraph--email_subscription": "EmailSubscription",
  "paragraph--external_search": "ExternalSearch",
  "paragraph--link_card_list": "CardGrid",
  "paragraph--text": "Text",
};

export const sectionFrontBottomContentDrupalParagraphsMap = {
  "paragraph--donor_credit": "DonorCredit",
};

export const sectionFrontResolver = {
  Query: {
    sectionFront: async (_, args, { dataSources }) => {
      const includedFields = [
        "field_ers_media_image.field_media_image",
        "field_ers_featured",
        "field_ers_featured.field_ers_image.field_media_image",
        // Secondary image
        "field_ers_featured.field_ers_secondary_image.field_media_image",
        // Link Card List
        "field_main_content.field_erm_link_cards",
        "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
        "field_main_content.field_erm_link_cards.field_erm_card_button_links",
        // Button Links
        "field_main_content.field_erm_button_links",
        // Bottom Content
        "field_erm_bottom_content",
      ];
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "section_front",
        includedFields,
        args.id,
        args.revisionId
      );
      const response = await dataSources.drupalJsonApi.getIndividualResource(
        apiPath,
        isPreview
      );

      return response;
    },
  },
  SectionFront: {
    id: (sectionFront) => sectionFront.id,
    title: (sectionFront) => sectionFront.title,
    description: (sectionFront) =>
      sectionFront.field_tfls_summary_description.processed,
    image: (sectionFront) =>
      sectionFront.field_ers_media_image.data !== null
        ? resolveImage(sectionFront.field_ers_media_image)
        : null,
    breadcrumbs: (sectionFront) => sectionFront.breadcrumbs,
    featuredContent: (sectionFront) =>
      getDrupalParagraphsField(sectionFront.field_ers_featured),
    mainContent: (sectionFront) =>
      getDrupalParagraphsField(sectionFront.field_main_content),
    bottomContent: (sectionFront) =>
      getDrupalParagraphsField(sectionFront.field_erm_bottom_content),
    colorway: (sectionFront) => {
      const slug = sectionFront.path?.alias;
      return getColorway(slug);
    },
  },
  SectionFrontFeaturedContent: {
    __resolveType: (object) => {
      return sectionFrontFeaturedContentDrupalParagraphsMap[object.type];
    },
  },
  SectionFrontMainContent: {
    __resolveType: (object) => {
      return sectionFrontMainContentDrupalParagraphsMap[object.type] || null;
    },
  },
  SectionFrontBottomContent: {
    __resolveType: (object) => {
      return sectionFrontBottomContentDrupalParagraphsMap[object.type];
    },
  },
};
