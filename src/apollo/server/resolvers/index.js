import { mergeResolvers } from "@graphql-tools/merge";
import { refineryLocationResolver } from "./refinery-location";
import { refineryTermResolver } from "./refinery-term";
import { autoSuggestionsResolver } from "./auto-suggestions";
import { decoupledRouterResolver } from "./decoupled-router";
import { filterResolver } from "./filter";
import { ipAccessCheckResolver } from "./ip-access-check";
import { searchResolver } from "./search";
import { termResolver } from "./taxonomy";
import { validatePatronCardResolver } from "./validate-patron-card";
// Content types
import { blogResolver } from "./blog";
import { homePageResolvers } from "./home-page";
import { locationResolver } from "./location";
import { onlineResourceResolver } from "./online-resource";
import { pageResolver } from "./page";
import { pressReleaseResolver } from "./press-release";
import { sectionFrontResolver } from "./section-front";
// Drupal paragraphs
import { drupalParagraphsResolvers } from "./drupal-paragraphs";
// Mutations
import { sendEmailResolver } from "./send-email";

export const resolvers = mergeResolvers([
  autoSuggestionsResolver,
  blogResolver,
  decoupledRouterResolver,
  drupalParagraphsResolvers,
  filterResolver,
  homePageResolvers,
  ipAccessCheckResolver,
  ipAccessCheckResolver,
  locationResolver,
  onlineResourceResolver,
  pageResolver,
  pressReleaseResolver,
  refineryLocationResolver,
  refineryTermResolver,
  searchResolver,
  sectionFrontResolver,
  sendEmailResolver,
  termResolver,
  validatePatronCardResolver,
]);
