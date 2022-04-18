import { mergeResolvers } from "graphql-tools";
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
// Mutations
import sendEmailResolver from "./sendEmailResolver";
// Communico
import eventResolver from "./eventResolver";
import eventFilterResolver from "./eventFilterResolver";

export const resolvers = mergeResolvers([
  refineryLocationResolver,
  refineryTermResolver,
  blogResolver,
  locationResolver,
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
  eventResolver,
  eventFilterResolver,
]);
