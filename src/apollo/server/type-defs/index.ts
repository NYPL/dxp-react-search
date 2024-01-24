import { mergeTypeDefs } from "@graphql-tools/merge";
// Types
import { autoSuggestionsTypeDefs } from "./auto-suggestions";
import { decoupledRouterTypeDefs } from "./decoupled-router";
import { drupalParagraphsTypeDefs } from "./drupal-paragraphs";
import { filterTypeDefs } from "./filter";
import { ipAccessCheckTypeDefs } from "./ip-access-check";
import { queryTypeDefs } from "./query";
import { refineryTypeDefs } from "./refinery";
import { searchTypeDefs } from "./search";
import { sharedTypeDefs } from "./shared";
import { taxonomyTypeDefs } from "./taxonomy";
import { validatePatronCardTypeDefs } from "./validate-patron-card";
// Content types
import { blogTypeDefs } from "./blog";
import { homePageTypeDefs } from "./home-page";
import { locationTypeDefs } from "./location";
import { onlineResourceTypeDefs } from "./online-resource";
import { pageTypeDefs } from "./page";
import { pressReleaseTypeDefs } from "./press-release";
import { sectionFronttypeDefs } from "./section-front";
// Menu
import { menuTypeDefs } from "./menu";
// Mutations
import { sendEmailTypeDefs } from "./send-email";

export const typeDefs = mergeTypeDefs([
  autoSuggestionsTypeDefs,
  blogTypeDefs,
  decoupledRouterTypeDefs,
  drupalParagraphsTypeDefs,
  filterTypeDefs,
  homePageTypeDefs,
  ipAccessCheckTypeDefs,
  locationTypeDefs,
  onlineResourceTypeDefs,
  pageTypeDefs,
  menuTypeDefs,
  pressReleaseTypeDefs,
  queryTypeDefs,
  refineryTypeDefs,
  searchTypeDefs,
  sectionFronttypeDefs,
  sendEmailTypeDefs,
  sharedTypeDefs,
  taxonomyTypeDefs,
  validatePatronCardTypeDefs,
]);
