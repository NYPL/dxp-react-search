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
    screen.debug(container);
  });
  
  // @TODO: Change state values based on logic in SearchResultsDetails > renderMessage() function.
  /*test('renders SearchResultsDetails Open now only', () => {
  });

  test('renders SearchResultsDetails Search query only.', () => {
  });

  test('renders SearchResultsDetails Search query + open now..', () => {
  });

  test('renders SearchResultsDetails No results.', () => {
  });
  */
    
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
