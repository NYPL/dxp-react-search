import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { render } from './../../../../testHelper/customRtlRender';
import Location from './Location';

expect.extend(toHaveNoViolations);

// Mock location prop
const location = {
  id: 'schwarzman',
  name: 'Stephen A. Schwarzman Building',
  url: 'https://www.nypl.org/locations/schwarzman',
  address_line1: '476 Fifth Avenue (42nd St and Fifth Ave)',
  address_line2: '476 Fifth Avenue (42nd St and Fifth Ave)',
  locality: 'New York',
  administrative_area: 'NY',
  postal_code: '10018',
  phone: '867-5309',
  wheelchairAccess: 'full',
  accessibilityNote: '',
  geoLocation: {
    lat: 40.7532,
    lng: -73.9822,
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
      <Location location={location} />
    );
  });

  test('it renders a location anchor with a link', () => {
    const { getByText } = render(
      <Location location={location} />
    );

    expect(getByText('Stephen A. Schwarzman Building').closest('a'))
      .toHaveAttribute('href', 'https://www.nypl.org/locations/schwarzman')
  });
});

// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <Location location={location} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
