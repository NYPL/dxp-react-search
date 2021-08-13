let responseIncluded;

const channelResolver = {
  Query: {
    allChannels: async (parent, args, { dataSources }) => {
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
    // @TODO delete me.
    imageUrl: channel => {
      return getImageUrlFromIncludedMedia(channel, responseIncluded, 'field_ers_image');
    },
    image: channel => channel,
    url: channel => channel.attributes.path.alias
  },
  Image: {
    id: image => image.relationships['field_ers_image'].data?.id,
    alt: image => 'test',
    uri: image => {
      const images = getImageUrlFromIncludedMedia(image, responseIncluded, 'field_ers_image');
      return images['uri']
    },
    transformations: image => {
      const transformations = []; 
      const images = getImageUrlFromIncludedMedia(image, responseIncluded, 'field_ers_image');
      images['transformations'].forEach(imageStyle => {
        for (const [label, uri] of Object.entries(imageStyle)) {
          transformations.push({
            id: `${image.relationships['field_ers_image'].data?.id}__${label}`,
            label: label,
            uri: uri
          });  
        }
      });
      return transformations;
    }
  }
}

/**
 * Gets an image url from a "included" media resource from the D9 json:api.
 *
 * @param {array} item - is this an object?
 * @param {array} responseIncluded - the included array from json respond.
 * @param {string} fieldName - name of the field for the image.
 * @return {object} image - An object of uri and transformations.
 */
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
  let image;
  let imageUri;
  responseIncluded.forEach(includedItem => {
    if (fileEntityId === includedItem.id) {
      const rawImageUri = includedItem.attributes.uri.url;
      // @TODO Clean this up, temporary fix for local url in diff format than aws.
      if (rawImageUri && rawImageUri.includes('sites/default')) {
        imageUri = `http://localhost:8080${rawImageUri}`;
      } else {
        imageUri = rawImageUri;
      }
      //
      image = {
        uri: imageUri,
        transformations: includedItem.attributes.image_style_uri
      }
    }
  });
  //console.log(image)
  return image;

  // @TODO Clean this up, temporary fix for local url in diff format than aws.
  /*if (imageUrl && imageUrl.includes('sites/default')) {
    return `http://localhost:8080${imageUrl}`;
  } else {
    return imageUrl;
  }
  */
}

export default channelResolver;