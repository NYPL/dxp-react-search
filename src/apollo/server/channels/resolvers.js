const channelResolver = {
  Query: {
    allChannels: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(
        args.type
      );
      return response.data;
    },
  },
  Channel: {
    id: (channel) => channel.id,
    tid: (channel) => channel.drupal_internal__tid,
    name: (channel) => channel.name,
    description: (channel) => channel.description.processed,
    image: (channel) =>
      channel.field_ers_image.data !== null
        ? channel.field_ers_image.field_media_image
        : null,
    url: (channel) => channel.path.alias,
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

export default channelResolver;
