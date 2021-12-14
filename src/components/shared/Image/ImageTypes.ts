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
