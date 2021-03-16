import { mergeResolvers } from 'graphql-tools';
import locationResolver from './locationResolver';
import termResolver from './termResolver';

export const resolvers = mergeResolvers([
  locationResolver,
  termResolver,
]);