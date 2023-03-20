import { TransformationType } from "./ImageTypes";

export function getImageTransformation(
  transformationLabel: string,
  transformations: TransformationType[]
): string | null {
  let imageUri: string | null = null;
  transformations.forEach((transformation: TransformationType) => {
    if (transformation.label === transformationLabel) {
      imageUri = transformation.uri;
    }
  });
  return imageUri;
}
