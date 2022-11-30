// Utils
import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
import resolveParagraphTypes from "./utils/resolveParagraphTypes";
import { resolveImage } from "./utils/resolveImage";
import { getIndividualResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";

const sectionFrontResolver = {
  Query: {
    sectionFront: async (_, args, { dataSources }) => {
      const includedFields = [
        "field_ers_media_image.field_media_image",
        "field_ers_featured",
        "field_ers_featured.field_ers_image.field_media_image",
        // Link Card List
        "field_main_content.field_erm_link_cards",
        "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
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
    featuredContent: (sectionFront, _, __, info) => {
      const typesInQuery = ["Donation"];
      const featuredContent =
        sectionFront.field_ers_featured.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [sectionFront.field_ers_featured],
              typesInQuery
            );
      return featuredContent;
    },
    mainContent: (sectionFront, _, __, info) => {
      const typesInQuery = ["CardGrid"];

      const mainContent =
        sectionFront.field_main_content.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              sectionFront.field_main_content,
              typesInQuery
            );
      return mainContent;
    },
  },
  SectionFrontFeaturedContent: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  SectionFrontMainContent: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type, "section_front");
    },
  },
};

export default sectionFrontResolver;
