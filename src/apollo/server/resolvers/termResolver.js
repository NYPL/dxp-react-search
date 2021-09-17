const graphqlFields = require("graphql-fields");

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
    termBySlug: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getTermBySlug(
        args.slug,
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
        ? term.field_ers_image.field_media_image
        : null,
    slug: (term) => term.path.alias,
  },
  // @TODO this should just use a util function that handles all images.
  Image: {
    id: (image) => image.id,
    alt: (image) => "test",
    uri: (image) => {
      if (image.uri.url && image.uri.url.includes("sites/default")) {
        return `http://localhost:8080${image.uri.url}`;
      } else {
        return image.uri.url;
      }
    },
    transformations: (image) => {
      let transformations = [];
      image.image_style_uri.forEach((imageStyle) => {
        for (const [label, uri] of Object.entries(imageStyle)) {
          transformations.push({
            id: `${image.id}__${label}`,
            label: label,
            uri: uri,
          });
        }
      });
      return transformations;
    },
  },
};

export default termResolver;
