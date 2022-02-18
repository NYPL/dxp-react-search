export interface JsonApiResourceObject {
  [index: string]: string | JsonApiAttributes;
}

export interface JsonApiAttributes {
  [index: string]:
    | string
    | number
    | boolean
    | string[]
    | JsonApiResourceObject
    | undefined
    | null;
}

export interface ImageTransformation {
  id: string;
  label: string;
  uri: string;
}
