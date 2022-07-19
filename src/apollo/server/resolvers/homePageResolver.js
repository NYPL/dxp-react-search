import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
import formatDate from "../../../utils/formatDate";
import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
import resolveParagraphTypes from "./utils/resolveParagraphTypes";
import { resolveImage } from "./utils/resolveImage";
import { getIndividualResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";

const homePageResolver = {
  Query: {
    homePage: async (_, args, { dataSources }) => {
      const includedFields = [
        "field_hp_slot_1.field_ers_image.field_media_image",
      ];
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "homepage",
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
  HomePage: {
    id: (homePage) => homePage.id,
    title: (homePage) => homePage.title,
    slotOne: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const slotOne =
        homePage.field_hp_slot_1.data?.length === 0
          ? null
          : resolveDrupalParagraphs([homePage.field_hp_slot_1], typesInQuery);
      return slotOne;
    },
  },
  SlotOne: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
};

export default homePageResolver;
