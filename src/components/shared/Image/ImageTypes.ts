/*
 * @TODO Use Next image type.
 * @see https://github.com/vercel/next.js/issues/19764
 * @see https://github.com/vercel/next.js/blob/canary/packages/next/client/image.tsx#L92
 */

export type ImageType = {
  id: string;
  alt: string;
  // @TODO add correct type.
  layout: any;
  // @TODO check if number is correct type.
  width?: number;
  height?: number;
  objectFit?: string;
  quality: number;
  uri: string;
  useTransformation: boolean;
  transformations?: TransformationType[];
  transformationLabel: string;
};

export type TransformationType = {
  id: string;
  label: string;
  uri: string;
};
