const probe = require("probe-image-size");
import { JsonApiResourceObject, ImageTransformation } from "./types";

/*type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
*/

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

export async function resolveImage(image: any) {
  if (image.type === "media--digital_collections_image") {
    const uri = `https://images.nypl.org/index.php?id=${image.field_media_dc_id}&t=w`;
    const imageStyles = [
      "1_1_960",
      "2_1_320",
      "2_1_960",
      "medium",
      "max_width_960",
    ];
    // @TODO add this to json:api in future work.
    // Get the image dimensions.
    const imageInfo = await getImageDimensions(uri);

    return {
      id: image.id,
      alt: image.field_media_alt_text,
      uri: uri,
      transformations: () => {
        let transformations: ImageTransformation[] = [];
        imageStyles.forEach((imageStyle) => {
          transformations.push({
            id: `${image.id}__${imageStyle}`,
            label: imageStyle,
            uri: uri,
          });
        });
        return transformations;
      },
      height: imageInfo.height,
      width: imageInfo.width,
    };
  } else {
    const mediaImage = image.field_media_image;
    return {
      id: mediaImage.id,
      alt: mediaImage.meta.alt,
      uri: () => {
        if (
          mediaImage.uri.url &&
          mediaImage.uri.url.includes("sites/default")
        ) {
          return `http://localhost:8080${mediaImage.uri.url}`;
        } else {
          return mediaImage.uri.url;
        }
      },
      transformations: () => {
        let transformations: ImageTransformation[] = [];
        mediaImage.image_style_uri.forEach(
          (imageStyle: JsonApiResourceObject) => {
            for (const [label, uri] of Object.entries(imageStyle)) {
              transformations.push({
                id: `${mediaImage.id}__${label}`,
                label: label,
                uri: uri as string,
              });
            }
          }
        );
        return transformations;
      },
      ...(mediaImage.meta.width && { width: mediaImage.meta.width }),
      ...(mediaImage.meta.height && { height: mediaImage.meta.height }),
    };
  }
}

async function getImageDimensions(uri: string) {
  try {
    const response = await probe(uri);
    return response;
  } catch (e) {
    console.error(e);
  }
}
