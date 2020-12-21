import { mergeResolvers } from 'graphql-tools';
import locationResolver from './locationResolver';

export const resolvers = mergeResolvers([
  locationResolver,
]);