import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";
import getDataSources from "./../server/datasources/getDataSources";
import { schema } from "./../server/schema";
const { NEXT_PUBLIC_GRAPHQL_API } = process.env;

let apolloClient: ApolloClient<any>;

function createIsomorphLink() {
  if (typeof window === "undefined") {
    // Server
    // SchemaLink allows us to query gql without network calls.
    const { SchemaLink } = require("@apollo/client/link/schema");
    //const { schema } = require("./../server/schema");

    return new SchemaLink({
      schema: schema,
      context: {
        dataSources: getDataSources(),
      },
    });
  } else {
    // Client
    const { HttpLink } = require("@apollo/client/link/http");

    return new HttpLink({
      uri: NEXT_PUBLIC_GRAPHQL_API,
      credentials: "same-origin",
    });
  }
}

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    // @TODO add apollo cache overrides from old version.
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  // @TODO re-write this whole function, its incomprehensible.
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here.
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client.
  if (typeof window === "undefined") {
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
