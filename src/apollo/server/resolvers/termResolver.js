const graphqlFields = require("graphql-fields");
import { imageResolver } from "./utils";

const termResolver = {
  Query: {
    allTermsByVocab: async (parent, args, { dataSources }, info) => {
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(
        args.vocabulary,
        args.sortBy,
        args.limit,
        args.featured,
        args.limiter,
        graphqlFields(info)
      );
      return response.data;
    },
    term: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getTermById(
        args.id,
        args.vocabulary
      );
      return response.data;
    },
  },
  Term: {
    id: (term) => term.id,
    tid: (term) => term.drupal_internal__tid,
    title: (term) => term.name,
    description: (term) => term.description?.processed,
    image: (term) =>
      term.field_ers_image.data !== null
        ? imageResolver(term.field_ers_image.field_media_image)
        : null,
    slug: (term) => term.path.alias,
  },
};

export default termResolver;
