/**
 * Gets an image url from a "included" media resource from the D9 json:api.
 *
 * @param {array} item - is this an object?
 * @param {array} responseIncluded - the included array from json respond.
 * @param {string} fieldName - name of the field for the image.
 * @return {object} image - An object of uri and transformations.
 */
function getImageUrlFromIncludedMedia(item, responseIncluded, fieldName) {
  //console.log(item);

  // Get the media entity id.
  let mediaEntityId = false;
  if (item.relationships[fieldName].data !== null) {
    mediaEntityId = item.relationships[fieldName].data.id;
  }
  // Find the included media entity item, to find the file entity id.
  let fileEntityId;
  responseIncluded.forEach((includedItem) => {
    // Find the included media entity item.
    if (mediaEntityId === includedItem.id) {
      fileEntityId = includedItem.relationships.field_media_image.data.id;
    }
  });
  // Find the included file entity item using the file entity id.
  let image;
  let imageUri;

  responseIncluded.forEach((includedItem) => {
    if (fileEntityId === includedItem.id) {
      const rawImageUri = includedItem.attributes.uri.url;
      // @TODO Clean this up, temporary fix for local url in diff format than aws.
      if (rawImageUri && rawImageUri.includes("sites/default")) {
        imageUri = `http://localhost:8080${rawImageUri}`;
      } else {
        imageUri = rawImageUri;
      }
      //
      image = {
        uri: imageUri,
        transformations: includedItem.attributes.image_style_uri,
      };
    }
  });
  return image;
}

export default getImageUrlFromIncludedMedia;
