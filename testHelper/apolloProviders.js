import {
  createApolloErrorProvider,
  createApolloMockedProvider,
  createApolloLoadingProvider,
} from 'apollo-mocked-provider';
import { typeDefs } from './../src/apollo/server/type-defs';

/*const typeDefs = [
  {
    "name": "Query"
  },
  {
    "name:" "LocationsQuery"
  },
  {
    "name": "Int"
  },
  {
    "name": "Filter"
  },
  {
    "name": "Boolean"
  },
  {
    "name": "SortByDistance"
  },
  {
    "name": "Float"
  },
  {
    "name": "LocationsConnection"
  },
  {
    "name": "Location"
  },
  {
    "name": "ID"
  },
  {
    "name": "String"
  },
  {
    "name": "GeoLocation"
  },
  {
    "name": "TodayHours"
  },
  {
    "name": "PageInfo"
  },
  {
    "name": "__Schema"
  },
  {
    "name": "__Type"
  },
  {
    "name": "__TypeKind"
  },
  {
    "name": "__Field"
  },
  {
    "name": "__InputValue"
  },
  {
    "name": "__EnumValue"
  },
  {
    "name": "__Directive"
  },
  {
    "name": "__DirectiveLocation"
  }
];
*/

export const ApolloMockedProvider = createApolloMockedProvider(typeDefs);
export const ApolloErrorProvider = createApolloErrorProvider();
export const ApolloLoadingProvider = createApolloLoadingProvider();
