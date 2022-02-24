export interface JsonApiResourceObject {
  [index: string]: JsonSerializable;
}

export type JsonSerializable =
  | string
  | number
  | boolean
  | null
  | JsonSerializable[]
  | { [key: string]: JsonSerializable };

export interface ImageTransformation {
  id: string;
  label: string;
  uri: string;
}

export type ResolvedParagraph = {
  [index: string]: string | number | boolean | object | undefined | null;
};
