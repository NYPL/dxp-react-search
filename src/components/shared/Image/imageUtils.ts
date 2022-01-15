import { TransformationType } from "./ImageTypes";

export function getImageTransformation(
  transformationLabel: string,
  transformations: TransformationType[]
) {
  let imageUri;
  transformations.map((transformation: TransformationType) => {
    if (transformation.label === transformationLabel) {
      imageUri = transformation.uri;
    }
  });
  return imageUri;
}
