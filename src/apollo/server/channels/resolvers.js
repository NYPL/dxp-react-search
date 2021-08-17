// Utils.
import getImageUrlFromIncludedMedia from "./../../../utils/getImageUrlFromIncludedMedia";
let responseIncluded;

const channelResolver = {
  Query: {
    allChannels: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(
        args.type
      );
      responseIncluded = response.included;
      return response.data;
    },
  },
  Channel: {
    id: (channel) => channel.id,
    tid: (channel) => channel.attributes.drupal_internal__tid,
    name: (channel) => channel.attributes.name,
    description: (channel) => channel.attributes.description.processed,
    image: (channel) => channel,
    url: (channel) => channel.attributes.path.alias,
  },
  Image: {
    id: (image) => image.relationships["field_ers_image"].data?.id,
    alt: (image) => "test",
    uri: (image) => {
      const images = getImageUrlFromIncludedMedia(
        image,
        responseIncluded,
        "field_ers_image"
      );
      return images["uri"];
    },
    transformations: (image) => {
      const transformations = [];
      const images = getImageUrlFromIncludedMedia(
        image,
        responseIncluded,
        "field_ers_image"
      );
      images["transformations"].forEach((imageStyle) => {
        for (const [label, uri] of Object.entries(imageStyle)) {
          transformations.push({
            id: `${image.relationships["field_ers_image"].data?.id}__${label}`,
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
