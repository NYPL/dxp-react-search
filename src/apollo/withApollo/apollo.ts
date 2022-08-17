import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import getDataSources from "./../server/datasources/getDataSources";
import { schema } from "./../server/schema";
const { NEXT_PUBLIC_GRAPHQL_API } = process.env;

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

  return new ApolloClient({
    ssrMode: isServer,
    link: createIsomorphLink(),
    // @TODO add apollo cache overrides from old version.
    cache: new InMemoryCache(),
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
    // @TODO add cache merging here?

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
