/*
 * @TODO Use Next image type.
 * @see https://github.com/vercel/next.js/issues/19764
 * @see https://github.com/vercel/next.js/blob/canary/packages/next/client/image.tsx#L92
 */

import { ImageProps as NextImageTypes } from "next/image";

export type ImageType = {
  id: string;
  alt: string;
  layout: NextImageTypes["layout"];
  // @TODO in next width and height can be number or string.
  width?: number;
  height?: number;
  objectFit?: NextImageTypes["objectFit"];
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
