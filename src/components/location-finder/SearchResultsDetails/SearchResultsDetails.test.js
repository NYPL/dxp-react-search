import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { render } from './../../../../testHelper/customRtlRender';
import SearchResultsDetails from './SearchResultsDetails';

expect.extend(toHaveNoViolations);

describe('SearchResultsDetails', () => {
  test('renders SearchResultsDetails component', () => {
    const { container } = render(
      <SearchResultsDetails />, { 
        initialState: { 
          search: {
            searchQuery: '125th Library',
            resultsCount: 92,
            openNow: true
          } 
        } 
      }
    );
    expect(container).toHaveTextContent('Showing 92 results near 125th Library, by distance and open now. Clear all search terms.');
    // console.log() equiv, will show output of component.
    //screen.debug(container);
  });
  
  // Test state values based on logic in SearchResultsDetails > renderMessage() function.
  test('renders SearchResultsDetails open now only', () => {
    const { container } = render(
      <SearchResultsDetails />, { 
        initialState: { 
          search: {
            searchQuery: '',
            resultsCount: 50,
            openNow: true
          } 
        } 
      }
    );
    expect(container).toHaveTextContent('Showing 50 results open now. Clear all search terms.');
  });

  test('renders SearchResultsDetails search query only', () => {
    const { container } = render(
      <SearchResultsDetails />, { 
        initialState: { 
          search: {
            searchQuery: 'New York Botanical Garden',
            resultsCount: 92,
            openNow: false
          } 
        } 
      }
    );
    expect(container).toHaveTextContent('Showing 92 results near New York Botanical Garden, by distance. Clear all search terms.');
  });

  test('renders SearchResultsDetails search query + open now', () => {
    const { container } = render(
      <SearchResultsDetails />, { 
        initialState: { 
          search: {
            searchQuery: 'Washington Square Park',
            resultsCount: 50,
            openNow: true
          } 
        } 
      }
    );
    expect(container).toHaveTextContent('Showing 50 results near Washington Square Park, by distance and open now. Clear all search terms.');
  });

  test('renders SearchResultsDetails no results', () => {
    const { container } = render(
      <SearchResultsDetails />, { 
        initialState: { 
          search: {
            searchQuery: '',
            resultsCount: 0,
            openNow: true
          } 
        } 
      }
    );
    expect(container).toHaveTextContent('No results found.');
  });
  
  // Accessbiility tests.
  test('should not have basic accessibility issues', async () => {
    const { container } = render(
      <SearchResultsDetails />, { 
        initialState: { 
          search: {
            searchQuery: '125th Library',
            resultsCount: 92,
            openNow: true
          } 
        } 
      }
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
