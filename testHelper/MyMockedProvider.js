import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MockLink } from '@apollo/react-testing';
import { onError } from "apollo-link-error";
import { ApolloLink } from 'apollo-link';

export function MyMockedProvider(props) {
  let {mocks, ...otherProps} = props;

  let mockLink = new MockLink(mocks);
  let errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  let link = ApolloLink.from([errorLoggingLink, mockLink]);

  return <MockedProvider {...otherProps} link={link} />;
}
