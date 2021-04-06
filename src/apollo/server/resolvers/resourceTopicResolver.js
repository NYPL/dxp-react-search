const resourceTopicResolver = {
  Query: {
    allResourceTopics: async (parent, args, { dataSources }) => {
      return await dataSources.drupalApi.getAllResourceTopics(args);
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

      //console.log(mediaEntityId);
      return false;
    }
  }
}

export default resourceTopicResolver;