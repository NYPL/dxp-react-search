import { mergeResolvers } from 'graphql-tools';
import locationResolver from './locationResolver';
import termResolver from './termResolver';
import resourceTopicResolver from './resourceTopicResolver';
import onlineResourceResolver from './onlineResourceResolver';
import onlineResourceSolrResolver from './onlineResourceSolrResolver';

export const resolvers = mergeResolvers([
  locationResolver,
  termResolver,
  resourceTopicResolver,
  onlineResourceResolver,
  onlineResourceSolrResolver
]);