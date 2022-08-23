import React from "react";
import { NextComponentType } from "next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./apollo";

/*
 * HOC component for wrapping next page components with <ApolloProvider>.
 */
export default function withApollo(
  PageComponent: NextComponentType
): NextComponentType {
  const WithApollo = ({ ...pageProps }) => {
    /*
     * pageProps.initialApolloState is set as a prop
     * inside getStaticProps or getServerSideProps, i.e,
     *
     * return {
     *   props: {
     *     initialApolloState: apolloClient.cache.extract(),
     *   },
     * }
     *
     */
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
      <ApolloProvider client={apolloClient}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  return WithApollo;
}
