import { mergeResolvers } from "@graphql-tools/merge";
import refineryLocationResolver from "./refineryLocationResolver";
import refineryTermResolver from "./refineryTermResolver";
import termResolver from "./termResolver";
import onlineResourceResolver from "./onlineResourceResolver";
import searchResolver from "./searchResolver";
import decoupledRouterResolver from "./decoupledRouterResolver";
import autoSuggestionsResolver from "./autoSuggestionsResolver";
import filterResolver from "./filterResolver";
import ipAccessCheckResolver from "./ipAccessCheckResolver";
import validatePatronCardResolver from "./validatePatronCardResolver";
// Content types
import blogResolver from "./blogResolver";
import locationResolver from "./locationResolver";
import pressReleaseResolver from "./pressReleaseResolver";
import homePageResolver from "./homePageResolver";
import sectionFrontResolver from "./sectionFrontResolver";
import landingPageResesolver from "./landingPageResolver";
// Mutations
import sendEmailResolver from "./sendEmailResolver";

export const resolvers = mergeResolvers([
  refineryLocationResolver,
  refineryTermResolver,
  blogResolver,
  locationResolver,
  pressReleaseResolver,
  homePageResolver,
  sectionFrontResolver,
  landingPageResesolver,
  termResolver,
  onlineResourceResolver,
  searchResolver,
  decoupledRouterResolver,
  autoSuggestionsResolver,
  ipAccessCheckResolver,
  validatePatronCardResolver,
  filterResolver,
  ipAccessCheckResolver,
  sendEmailResolver,
]);
