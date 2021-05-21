// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

let responseIncluded;

const resourceTopicResolver = {
  Query: {
    allResourceTopics: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllResourceTopics();
      responseIncluded = response.included;

      return response.data;
    },
  },
  ResourceTopic: {
    id: resourceTopic => {
      return resourceTopic.id;
    },
    name: resourceTopic => {
      return resourceTopic.attributes.name;
    },
    description: resourceTopic => {
      return resourceTopic.attributes.description.processed;
    },
    imageUrl: resourceTopic => {
      // Get the media entity id.
      let mediaEntityId = false;
      if (resourceTopic.relationships.field_ers_image.data !== null) {
        mediaEntityId = resourceTopic.relationships.field_ers_image.data.id;
      }
      // Find the included media entity item, to find the file entity id.
      let fileEntityId;
      responseIncluded.forEach(includedItem => {
        // Find the included media entity item.
        if (mediaEntityId === includedItem.id) {
          fileEntityId = includedItem.relationships.field_media_image.data.id
        }
      });
      // Find the included file entity item using the file entity id.
      let imageUrl;
      responseIncluded.forEach(includedItem => {
        if (fileEntityId === includedItem.id) {
          imageUrl = includedItem.attributes.uri.url;
        }
      });
      
      // @TODO Clean this up, temporary fix for local url in diff format than aws.
      if (imageUrl && imageUrl.includes('sites/default')) {
        return `http://localhost:8080${imageUrl}`;
      } else {
        return imageUrl;
      }
    }
  }
}

export default resourceTopicResolver;