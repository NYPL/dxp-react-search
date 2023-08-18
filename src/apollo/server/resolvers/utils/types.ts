import DrupalJsonApi from "../../datasources/drupal-json-api/DrupalJsonApi";
import DrupalApi from "../../datasources/DrupalApi";
import LocalistApi from "../../datasources/LocalistApi";
import PlatformApi from "../../datasources/PlatformApi";
import RefineryApi from "../../datasources/RefineryApi";
import SendGridApi from "../../datasources/SendGridApi";

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

export interface QueryArguments {
  limit: number;
  pageNumber: number;
  filter?: any;
  sort?: any;
}

type DataSourcesType = {
  refineriApi: RefineryApi;
  drupalApi: DrupalApi;
  drupalJsonApi: DrupalJsonApi;
  platformApi: PlatformApi;
  sendGridApi: SendGridApi;
  localistApi: LocalistApi;
};
export interface DataSources {
  dataSources: DataSourcesType;
}
