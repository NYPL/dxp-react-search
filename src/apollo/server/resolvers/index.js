import { mergeResolvers } from "graphql-tools";
//import locationResolver from "./locationResolver";
import termResolver from "./termResolver";
import resourceTopicResolver from "./resourceTopicResolver";
import onlineResourceResolver from "./onlineResourceResolver";
import searchResolver from "./searchResolver";
import decoupledRouterResolver from "./decoupledRouterResolver";
import autoSuggestionsResolver from "./autoSuggestionsResolver";
import filterResolver from "./filterResolver";
import ipAccessCheckResolver from "./ipAccessCheckResolver";
import validatePatronCardResolver from "./validatePatronCardResolver";

// TEST
import channelResolver from "./../channels/resolvers";

export const resolvers = mergeResolvers([
  //locationResolver,
  termResolver,
  resourceTopicResolver,
  onlineResourceResolver,
  searchResolver,
  decoupledRouterResolver,
  autoSuggestionsResolver,
  ipAccessCheckResolver,
  validatePatronCardResolver,
  filterResolver,
  ipAccessCheckResolver,
  channelResolver,
]);
