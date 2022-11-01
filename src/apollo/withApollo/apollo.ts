import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import getDataSources from "./../server/datasources/getDataSources";
import { schema } from "./../server/schema";
const { NEXT_PUBLIC_GRAPHQL_API } = process.env;

// Add type for the apollo page props
// @see https://github.com/vercel/next.js/discussions/16522
export interface ApolloPageProps {
  initialApolloState: NormalizedCacheObject;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createIsomorphLink() {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // SchemaLink allows us to query gql without network calls.
    const { SchemaLink } = require("@apollo/client/link/schema");

    return new SchemaLink({
      schema: schema,
      context: {
        dataSources: getDataSources(),
      },
    });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");

    return new HttpLink({
      uri: NEXT_PUBLIC_GRAPHQL_API,
      credentials: "same-origin",
    });
  }
}

export function createApolloClient() {
  const isServer = typeof window === "undefined";

  const cache = new InMemoryCache({
    typePolicies: {
      FilterItem: {
        // IDs will clash between taxonomy tid and content nids.
        keyFields: ["id", "name"],
      },
      Query: {
        fields: {
          searchDocument(_, { args, toReference }) {
            return toReference({
              __typename: "OnlineResourceDocument",
              id: args?.id,
            });
          },
          resourceTopic(_, { args, toReference }) {
            return toReference({
              __typename: "ResourceTopic",
              id: args?.id,
            });
          },
          blog(_, { args, toReference }) {
            return toReference({
              __typename: "Blog",
              id: args?.id,
            });
          },
        },
      },
    },
  });

  return new ApolloClient({
    ssrMode: isServer,
    link: createIsomorphLink(),
    cache: cache,
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const isServer = typeof window === "undefined";

  // If apolloClient is null or undefined, create a new client.
  const _apolloClient = apolloClient ?? createApolloClient();
  // const _apolloClient =
  //   apolloClient !== null || apolloClient !== undefined
  //     ? apolloClient
  //     : createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here.
  if (initialState) {
    // @TODO Add merge cache here.
    // Requires:
    // import merge from 'deepmerge';
    // import isEqual from 'lodash/isEqual';
    //
    // Get existing cache, loaded during client side data fetching.
    // const existingCache = _apolloClient.extract();

    // // Merge the existing cache into data passed from getStaticProps/getServerSideProps.
    // const data = merge(initialState, existingCache, {
    //   // Combine arrays using object equality (like in sets)
    //   arrayMerge: (destinationArray, sourceArray) => [
    //     ...sourceArray,
    //     ...destinationArray.filter((d) =>
    //       sourceArray.every((s) => !isEqual(d, s))
    //     ),
    //   ],
    // });
    // // Restore the cache with the merged data.
    // _apolloClient.cache.restore(initialState);

    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client.
  if (isServer) {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client.
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
