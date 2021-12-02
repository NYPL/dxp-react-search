/*export const Image = {
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
      console.log(image);
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
*/

export function imageResolver(image) {
  return {
    id: image.id,
    //alt: image.meta.alt,
    alt: "imageResolver alt!",
    uri: () => {
      if (image.uri.url && image.uri.url.includes("sites/default")) {
        return `http://localhost:8080${image.uri.url}`;
      } else {
        return image.uri.url;
      }
    },
    transformations: () => {
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
  };
}

export function drupalParagraphsResolver(field) {
  const items = [];
  field.map((item) => {
    let paragraphComponent;
    let paragraphTypeName = item.type.replace("paragraph--", "");

    switch (item.type) {
      case "paragraph--text_with_image":
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          text: item.field_tfls_summary_descrip.processed,
          image: imageResolver(item.field_ers_media_item.field_media_image),
        };
        break;
      case "paragraph--video":
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          description: item.field_tfls_description.processed,
          video: item.field_ers_media_item.field_media_oembed_video,
        };
        break;
      case "paragraph--slideshow":
        const slideshowImages = [];
        item.field_erm_media_items.map((imageItem) => {
          slideshowImages.push(imageItem);
        });
        paragraphComponent = {
          id: item.id,
          type: paragraphTypeName,
          heading: item.field_ts_heading,
          images: slideshowImages,
        };
        break;
    }
    items.push(paragraphComponent);
  });
  return items;
}
