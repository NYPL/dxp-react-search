import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
import resolveParagraphTypes from "./utils/resolveParagraphTypes";
import { resolveImage } from "./utils/resolveImage";
import { getIndividualResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";
import getColorway from "../../../utils/get-colorway";

const landingPageResolver = {
  Query: {
    landingPage: async (_, args, { dataSources }) => {
      // json:api by default will not return the full data for entity reference fields,
      // such as media, paragraphs, etc. We can have the full data for these entities returned,
      // by adding included fields here.
      const includedFields = [
        "field_ers_media_image.field_media_image",
        "field_main_content",
        // For the featured_card image field
        "field_main_content.field_ers_media_item.field_media_image",
        // Campaign Card Grid
        "field_main_content.field_ern_cards",
        "field_main_content.field_ern_cards.field_ers_media_item.field_media_image",
      ];
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "landing_page",
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
  LandingPage: {
    id: (landingPage) => landingPage.id,
    slug: (landingPage) => landingPage.path.alias,
    title: (landingPage) => landingPage.title,
    description: (landingPage) =>
      landingPage.field_tfls_summary_description.processed,
    contentType: (landingPage) => landingPage.type,
    sectionTitle: (landingPage) => landingPage.field_ts_section_title,
    backgroundimage: (landingPage) =>
      landingPage.field_ers_hero_image.data !== null
        ? resolveImage(landingPage.field_ers_hero_image)
        : null,
    foregroundImage: (landingPage) =>
      landingPage.field_ers_media_image.data !== null
        ? resolveImage(landingPage.field_ers_media_image)
        : null,
    mainContent: (landingPage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const mainContent =
        landingPage.field_main_content.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              landingPage.field_main_content,
              typesInQuery
            );
      return mainContent;
    },
  },
  LandingPageMainContent: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
};

export default landingPageResolver;
