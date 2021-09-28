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

export const resolvers = mergeResolvers([
  refineryLocationResolver,
  refineryTermResolver,
  blogResolver,
  termResolver,
  onlineResourceResolver,
  searchResolver,
  decoupledRouterResolver,
  autoSuggestionsResolver,
  ipAccessCheckResolver,
  validatePatronCardResolver,
  filterResolver,
  ipAccessCheckResolver,
]);
