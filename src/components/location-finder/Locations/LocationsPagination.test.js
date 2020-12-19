import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { render } from './../../../../testHelper/customRtlRender';
import LocationsPagination from './LocationsPagination';

expect.extend(toHaveNoViolations);

// Mock Data
const search = {
  pageCount: 12,
  pageNumber: 7
}

describe('LocationsPagination', () => {
  test('renders LocationPagination component', () => {
    render(
      <LocationsPagination />,
      { initialState: { search } }
    );
  });
});

describe('LocationsPagination', () => {
  test('selected page item should be set to 7', () => {
    const { container } = render(
      <LocationsPagination />,
      { initialState: { search } }
    );

    expect(container.querySelector('.selected')).toHaveTextContent('7');
  });
});

describe('LocationsPagination', () => {
  test('total number of page items should be 12', () => {
    const { container, debug } = render(
      <LocationsPagination />,
      { initialState: { search } }
    );

    // With pageCount of 12, pagination should look like this....
    // Prev 1 ... 5 6 7 8 9 ... 12 Next
    const lastItem = container.querySelectorAll('li')[9].textContent;
    expect(lastItem).toBe('12');
  });
});

// Accessibility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <LocationsPagination />,
    { initialState: { search } }
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
