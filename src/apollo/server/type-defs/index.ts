import { mergeTypeDefs } from "@graphql-tools/merge";
// Types
// @TODO rename these to newer format, i.e, PageTypeDefs, BlogTypeDefs, etc.
import { typeDefs as RefineryLocationTypes } from "./refineryLocation";
import { typeDefs as RefineryFilterTypes } from "./refineryFilter";
import { typeDefs as OnlineResourceTypes } from "./onlineResource";
import { typeDefs as TaxonomyTypes } from "./taxonomy";
import { typeDefs as SearchTypes } from "./search";
import { typeDefs as SharedTypes } from "./shared";
import { typeDefs as DecoupledRouterTypes } from "./decoupledRouter";
import { typeDefs as AutoSuggestionsTypes } from "./autoSuggestions";
import { typeDefs as IpAccessCheckTypes } from "./ipAccessCheck";
import { typeDefs as ValidatePatronCardTypes } from "./validatePatronCard";
import { typeDefs as FilterTypes } from "./filter";
// Content types
import { typeDefs as BlogTypes } from "./blog";
import { typeDefs as LocationTypes } from "./location";
import { typeDefs as PressReleaseTypes } from "./press";
import { typeDefs as HomePageTypes } from "./homepage";
import { typeDefs as SectionFrontTypes } from "./sectionFront";
import { PageTypeDefs } from "./page";
import { MenuTypeDefs } from "./menu";
// Mutations
import { typeDefs as SendEmailTypes } from "./sendEmail";

export const typeDefs = mergeTypeDefs([
  SharedTypes,
  SearchTypes,
  RefineryLocationTypes,
  RefineryFilterTypes,
  OnlineResourceTypes,
  TaxonomyTypes,
  DecoupledRouterTypes,
  AutoSuggestionsTypes,
  IpAccessCheckTypes,
  ValidatePatronCardTypes,
  FilterTypes,
  BlogTypes,
  LocationTypes,
  PressReleaseTypes,
  HomePageTypes,
  SectionFrontTypes,
  PageTypeDefs,
  MenuTypeDefs,
  SendEmailTypes,
]);
