import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
// Types
import { typeDefs as LocationTypes } from './type-defs/location.js';
import { typeDefs as OnlineResourceTypes } from './type-defs/onlineResource.js';
import { typeDefs as TaxonomyTypes } from './type-defs/taxonomy.js';
import { typeDefs as SharedTypes } from './type-defs/shared.js';

export const schema = makeExecutableSchema({
  typeDefs: [ 
    SharedTypes,
    LocationTypes, 
    OnlineResourceTypes, 
    TaxonomyTypes,
  ],
  resolvers,
})
