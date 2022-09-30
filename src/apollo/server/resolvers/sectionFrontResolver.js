// import { parseResolveInfo } from "graphql-parse-resolve-info";
// // Utils
// import formatDate from "../../../utils/formatDate";
// import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
// import resolveParagraphTypes from "./utils/resolveParagraphTypes";
// import { resolveImage } from "./utils/resolveImage";
import {
  getIndividualResourceJsonApiPath,
  // getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";

const sectionFrontResolver = {
  Query: {
    sectionFront: async (_, args, { dataSources }) => {
      const includedFields = [
        // "field_ers_media_image.field_media_image",
        // "field_main_content.field_ers_media_item.field_media_image",
        // "field_erm_location",
        // // Link Card List
        // "field_main_content.field_erm_link_cards",
        // "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
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
  },
};

export default sectionFrontResolver;
