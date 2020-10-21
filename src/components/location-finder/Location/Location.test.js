import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import TestProvider from './../../../../testHelper/TestProvider';
import Location from './Location';

expect.extend(toHaveNoViolations);

// Mock location prop
const location = {
  id: '57th-street',
  name: '57th Street',
  address_line1: 'address line 1',
  address_line2: 'address line 2',
  locality: 'brooklyn',
  administrative_area: 'NY',
  postal_code: '90210',
  phone: '867-5309',
  wheelchairAccess: 'partial',
  accessibilityNote: 'test',
  geoLocation: {
    lat: 42.56,
    lng: -75.50,
  },
  todayHours: {
    start: '11:00',
    end: '16:00'
  },
  open: true,
}

// Mock the LocationDistance sub component, as it will be tested on its own.
jest.mock('./LocationDistance', () => () => <div>LocationDistance</div>);

describe('Location', () => {
  test('renders Location component', () => {
    render(
      <TestProvider>
        <Location location={location} />
      </TestProvider>
    );
  });

  test('it renders a location anchor with a link', () => {
    const { getByText } = render(
      <TestProvider>
        <Location location={location} />
      </TestProvider>
    );

    screen.debug();

    expect(getByText('57th Street').closest('a'))
      .toHaveAttribute('href', 'https://www.nypl.org/locations/57th-street')
  });
});

// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <TestProvider>
      <Location location={location} />
    </TestProvider>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
