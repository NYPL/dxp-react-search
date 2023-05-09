import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
import resolveParagraphTypes from "./utils/resolveParagraphTypes";
import { resolveImage } from "./utils/resolveImage";
import { getIndividualResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";
import getColorway from "../../../utils/get-colorway";

const sectionFrontResolver = {
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
    featuredContent: (sectionFront, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
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
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const mainContent =
        sectionFront.field_main_content.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              sectionFront.field_main_content,
              typesInQuery,
              sectionFront
            );
      return mainContent;
    },
    colorway: (sectionFront) => {
      const slug = sectionFront.path?.alias;
      return getColorway(slug);
    },
    bottomContent: (sectionFront, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const bottomContent =
        sectionFront.field_erm_bottom_content.data === null
          ? null
          : resolveDrupalParagraphs(
              sectionFront.field_erm_bottom_content,
              typesInQuery,
              sectionFront
            );
      return bottomContent;
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
  SectionFrontBottomContent: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
};

export default sectionFrontResolver;
