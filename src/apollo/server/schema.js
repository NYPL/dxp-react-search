import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
// Types
import { typeDefs as RefineryLocationTypes } from "./type-defs/refineryLocation";
import { typeDefs as RefineryFilterTypes } from "./type-defs/refineryFilter";
import { typeDefs as OnlineResourceTypes } from "./type-defs/onlineResource";
import { typeDefs as TaxonomyTypes } from "./type-defs/taxonomy";
import { typeDefs as SearchTypes } from "./type-defs/search";
import { typeDefs as SharedTypes } from "./type-defs/shared";
import { typeDefs as DecoupledRouterTypes } from "./type-defs/decoupledRouter";
import { typeDefs as AutoSuggestionsTypes } from "./type-defs/autoSuggestions";
import { typeDefs as IpAccessCheckTypes } from "./type-defs/ipAccessCheck";
import { typeDefs as ValidatePatronCardTypes } from "./type-defs/validatePatronCard";
import { typeDefs as FilterTypes } from "./type-defs/filter";
// Content types
import { typeDefs as BlogTypes } from "./type-defs/blog";
import { typeDefs as LocationTypes } from "./type-defs/location";
import { typeDefs as PressReleaseTypes } from "./type-defs/press";
// Mutations
import { typeDefs as SendEmailTypes } from "./type-defs/sendEmail";

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
    PressReleaseTypes,
    SendEmailTypes,
  ],
  resolvers,
});
