let responseIncluded;

const channelResolver = {
  Query: {
    allChannels: async (parent, args, { dataSources }) => {
      //const vocab = 'channel';
      //const vocab = 'resource_topic';
      const response = await dataSources.drupalApi.getAllTermsByVocabulary(args.type);
      responseIncluded = response.included;

      return response.data;
    },
    /*resourceTopic: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getResourceTopic(args);
      return response;
    }
    */
  },
  Channel: {
    id: channel => channel.id,
    tid: channel => channel.attributes.drupal_internal__tid,
    name: channel => channel.attributes.name,
    description: channel => channel.attributes.description.processed,
    imageUrl: channel => {
      return getImageUrlFromIncludedMedia(channel, responseIncluded, 'field_ers_image');
    },
    image: channel => channel,
    url: channel => channel.attributes.path.alias
  },
  Image: {
    id: image => image.relationships['field_ers_image'].data?.id,
    alt: image => 'test',
    items: image => {
      const test = []; 
      const imageStyles = getImageUrlFromIncludedMedia(image, responseIncluded, 'field_ers_image');
      imageStyles.forEach(imageStyle => {
        for (const [key, value] of Object.entries(imageStyle)) {
          test.push({
            label: key,
            uri: value
          });
        }
      })
      return test;
    }
  }
}

function getImageUrlFromIncludedMedia(item, responseIncluded, fieldName) {
  // Get the media entity id.
  let mediaEntityId = false;
  if (item.relationships[fieldName].data !== null) {
    mediaEntityId = item.relationships[fieldName].data.id;
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
      //imageUrl = includedItem.attributes.uri.url;
      //console.log(includedItem.attributes.image_style_uri)
      //imageUrl = includedItem.attributes.image_style_uri[0]['medium'];
      imageUrl = includedItem.attributes.image_style_uri;
    }
  });
  //console.log(imageUrl)
  return imageUrl;

  // @TODO Clean this up, temporary fix for local url in diff format than aws.
  /*if (imageUrl && imageUrl.includes('sites/default')) {
    return `http://localhost:8080${imageUrl}`;
  } else {
    return imageUrl;
  }
  */
}

export default channelResolver;