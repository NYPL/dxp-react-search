import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import * as redux from 'react-redux';
import { render } from './../../../../testHelper/customRtlRender';
import LocationDistance from './LocationDistance';

expect.extend(toHaveNoViolations);

// Mock search geocordinates
const search = {
  searchQueryGeoLat: 40.7534168,
  searchQueryGeoLng: -73.9819148
}

// Mock location geocordinates
const locationPoint = {
  lat: 40.7534168,
  lng: -73.9819148
}

describe('LocationDistance', () => {
  test('renders LocationDistance component', () => {
    render(
      <LocationDistance locationPoint={locationPoint} />,
      { initialState: { search } }
    );
  });
});

// Test a known distance 1
// Search: Stephen A. Schwarzman Building | 40.7534168, -73.9819148
// Location: Grand Central Library | 40.7539, -73.974
// Expected Distance: 0.4 miles

// Location point.
const grandCentralPoint = {
  lat: 40.7539,
  lng: -73.974
}

describe('LocationDistance', () => {
  test('location distance should be 0.4 miles', () => {
    render(
      <LocationDistance locationPoint={grandCentralPoint} />,
      { initialState: { search } }
    );

    expect(screen.getByText('0.4 miles')).toBeInTheDocument();
  });
});

// Test a known distance 2
// Search: Stephen A. Schwarzman Building | 40.7534168, -73.9819148
// Location: Stephen A. Schwarzman Building | 40.7532, -73.9822
// Expected Distance: 0.0 miles

// Location point.
const sasbPoint = {
  lat: 40.7532,
  lng: -73.9822
}

describe('LocationDistance', () => {
  test('location distance should be 0.0 miles', () => {
    render(
      <LocationDistance locationPoint={sasbPoint} />,
      { initialState: { search } }
    );

    expect(screen.getByText('0.0 miles')).toBeInTheDocument();
  });
});

// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <LocationDistance locationPoint={locationPoint} />,
    { initialState: { search } }
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
