import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";
// Types
import { typeDefs as RefineryLocationTypes } from "./type-defs/refineryLocation.js";
import { typeDefs as RefineryFilterTypes } from "./type-defs/refineryFilter.js";
import { typeDefs as OnlineResourceTypes } from "./type-defs/onlineResource.js";
import { typeDefs as TaxonomyTypes } from "./type-defs/taxonomy.js";
import { typeDefs as SearchTypes } from "./type-defs/search.js";
import { typeDefs as SharedTypes } from "./type-defs/shared.js";
import { typeDefs as DecoupledRouterTypes } from "./type-defs/decoupledRouter.js";
import { typeDefs as AutoSuggestionsTypes } from "./type-defs/autoSuggestions.js";
import { typeDefs as IpAccessCheckTypes } from "./type-defs/ipAccessCheck";
import { typeDefs as ValidatePatronCardTypes } from "./type-defs/validatePatronCard";
import { typeDefs as FilterTypes } from "./type-defs/filter";
// Content types
import { typeDefs as BlogTypes } from "./type-defs/blog.js";
import { typeDefs as LocationTypes } from "./type-defs/location.js";
import { typeDefs as HomePageTypes } from "./type-defs/homepage.js";
// Mutations
import { typeDefs as SendEmailTypes } from "./type-defs/sendEmail.js";

export const schema = makeExecutableSchema({
  typeDefs: [
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
    HomePageTypes,
    SendEmailTypes,
  ],
  resolvers,
});
