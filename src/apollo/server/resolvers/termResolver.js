const termResolver = {
  Query: {
    allTermsByVocab: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(
        args.vocabulary
      );
      return response.data;
    },
    termBySlug: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(
        args.vocabulary
      );
      return response.data;
    },
  },
  Term: {
    id: (term) => term.id,
    tid: (term) => term.drupal_internal__tid,
    name: (term) => term.name,
    description: (term) => term.description.processed,
    image: (term) =>
      term.field_ers_image.data !== null
        ? term.field_ers_image.field_media_image
        : null,
    url: (term) => term.path.alias,
  },
  // @TODO this should just use a util function that handles all images.
  Image: {
    id: (image) => image.id,
    alt: (image) => "test",
    // @TODO Add code for including local host.
    uri: (image) => image.uri.url,
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
