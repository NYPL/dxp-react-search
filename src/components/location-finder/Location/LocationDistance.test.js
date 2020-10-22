import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import * as redux from 'react-redux';
import { render } from './../../../../testHelper/customRtlRender';
import LocationDistance from './LocationDistance';

expect.extend(toHaveNoViolations);

// Search geocordinates
const search = {
  searchQueryGeoLat: 12.56,
  searchQueryGeoLng: -75.50
}

// Mock location geocordinates
const locationPoint = {
  lat: 42.56,
  lng: -75.50
}

describe('LocationDistance', () => {
  test('renders LocationDistance component', () => {
    render(
      <LocationDistance locationPoint={locationPoint} />,
      { initialState: { search } }
    );

    screen.debug();
  });
});

// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <LocationDistance locationPoint={locationPoint} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
