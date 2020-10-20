import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
// Redux
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// Component
import Location from './Location';

expect.extend(toHaveNoViolations);

// Mock redux
const initialState = {};
const mockStore = configureStore();
const store = mockStore(initialState);

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
      <Provider store={store}>
        <Location location={location} />
      </Provider>
    );
  });

  test('it renders a location anchor with a link', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Location location={location} />
      </Provider>
    );

    screen.debug();

    expect(getByText('57th Street').closest('a'))
      .toHaveAttribute('href', 'https://www.nypl.org/locations/57th-street')
  });
});

// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <Provider store={store}>
      <Location location={location} />
    </Provider>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
