import { ImageTransformation, ResolvedParagraph } from "./types";
const { DRUPAL_API } = process.env;

export function resolveImage(image: any): ResolvedParagraph | null {
  // Special handling for these media types, as they are "fake" media images in D9.
  if (
    image.type === "media--digital_collections_image" ||
    image.type === "media--remote_catalog_image"
  ) {
    // If image fields for width or height are missing, return no null for no image.
    if (
      image.field_media_image_width === null ||
      image.field_media_image_height === null
    ) {
      return null;
    }

    let imageUri = "";
    if (image.type === "media--digital_collections_image") {
      imageUri = `https://images.nypl.org/index.php?id=${image.field_media_dc_id}&t=w`;
    }
    if (image.type === "media--remote_catalog_image") {
      imageUri = image.field_media_image_src.url;
    }

    const imageStyles = [
      "1_1_960",
      "2_1_320",
      "2_1_960",
      "medium",
      "max_width_960",
    ];

    return {
      id: image.id,
      alt: image.field_media_alt_text,
      uri: imageUri,
      transformations: () => {
        const transformations: ImageTransformation[] = [];
        imageStyles.forEach((imageStyle) => {
          transformations.push({
            id: `${image.id}__${imageStyle}`,
            label: imageStyle,
            uri: imageUri,
          });
        });
        return transformations;
      },
      width: image.field_media_image_width,
      height: image.field_media_image_height,
    };
  }

  // Default media image types.
  const mediaImage = image.field_media_image;
  return {
    id: mediaImage.id,
    alt: mediaImage.meta.alt,
    // Drupal json:api returns a relative path for the image, without domain,
    // so we add the domain here from the .env variable.
    uri: `${DRUPAL_API}${mediaImage.uri.url}`,
    transformations: () => {
      const transformations: ImageTransformation[] = [];
      const imageStyle = mediaImage.image_style_uri as object;
      for (const [label, uri] of Object.entries(imageStyle)) {
        transformations.push({
          id: `${mediaImage.id}__${label}`,
          label: label,
          uri: uri,
        });
      }
      return transformations;
    },
    ...(mediaImage.meta.width && { width: mediaImage.meta.width }),
    ...(mediaImage.meta.height && { height: mediaImage.meta.height }),
  };
}
