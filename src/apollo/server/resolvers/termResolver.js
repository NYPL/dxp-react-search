import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";
import { resolveImage } from "./utils/resolveImage";

const includedFields = ["field_ers_image.field_media_image"];

const termResolver = {
  Query: {
    allTermsByVocab: async (_, args, { dataSources }) => {
      const addIncludeFields =
        args.vocabulary === "channel" || args.vocabulary === "resource_topic"
          ? true
          : false;
      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };

      const apiPath = getCollectionResourceJsonApiPath(
        "taxonomy_term",
        args.vocabulary,
        addIncludeFields ? includedFields : null,
        args.filter,
        args.sort,
        pagination
      );

      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath
      );
      return response.data;
    },
    term: async (_, args, { dataSources }) => {
      const addIncludeFields =
        args.vocabulary === "channel" || args.vocabulary === "resource_topic"
          ? true
          : false;

      const apiPath = getIndividualResourceJsonApiPath(
        "taxonomy_term",
        args.vocabulary,
        addIncludeFields ? includedFields : null,
        args.id
      );
      const response = await dataSources.drupalJsonApi.getIndividualResource(
        apiPath
      );
      return response;
    },
  },
  Term: {
    id: (term) => term.id,
    tid: (term) => term.drupal_internal__tid,
    title: (term) => term.name,
    description: (term) => term.description?.processed,
    image: (term) =>
      term.field_ers_image.data !== null
        ? resolveImage(term.field_ers_image)
        : null,
    slug: (term) => term.path.alias,
  },
};

export default termResolver;
