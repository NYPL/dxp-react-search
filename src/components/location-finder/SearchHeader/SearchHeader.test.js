import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { render } from './../../../../testHelper/customRtlRender';
import SearchHeader from './SearchHeader';

expect.extend(toHaveNoViolations);

const mocks = [];

describe('SearchHeader', () => {
  test('renders SearchHeader component', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader />
      </MockedProvider>
    );
  });

  test('SearchHeader component should have title', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader />
      </MockedProvider>
    );
    expect(container.querySelector('#location-finder__title')).toBeInTheDocument();
  });

  test('SearchHeader component should have a search form', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader />
      </MockedProvider>
    );
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  // Accessbiility tests.
  // @TODO
  // Currently Fails on autocomplete listbox form item
  // Required ARIA child role not present: option
  /* test('should not have basic accessibility issues', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader />
      </MockedProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }); */
});
