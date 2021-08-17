// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
// Utils
import getImageUrlFromIncludedMedia from "./../../../utils/getImageUrlFromIncludedMedia";
let responseIncluded;

const resourceTopicResolver = {
  Query: {
    allResourceTopics: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(
        args.type
      );
      responseIncluded = response.included;
      return response.data;
    },
    resourceTopic: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getResourceTopic(args);
      responseIncluded = response.included;
      return response.data;
    },
  },
  ResourceTopic: {
    id: (resourceTopic) => resourceTopic.id,
    tid: (resourceTopic) => resourceTopic.attributes.drupal_internal__tid,
    name: (resourceTopic) => resourceTopic.attributes.name,
    description: (resourceTopic) =>
      resourceTopic.attributes.description.processed,
    image: (resourceTopic) => resourceTopic,
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

export default resourceTopicResolver;
