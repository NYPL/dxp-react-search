import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import * as redux from 'react-redux';
import { render } from './../../../../testHelper/customRtlRender';
import LocationAccessibility from './LocationAccessibility';

expect.extend(toHaveNoViolations);

// Mock accessibility access
const access_full = 'full';
const note = '';

describe('LocationAccessibility', () => {
  test('renders LocationAccessibility component', () => {
    render(
      <LocationAccessibility access={access_full} note={note} />
    );
  });

  // Test accessibility access 1
  // Access: Fully Accessible
  test('Location should be fully accessible', () => {
    render(
      <LocationAccessibility access={access_full} note={note} />
    );

    expect(screen.getByText('Fully Accessible')).toBeInTheDocument();
  });

  // Test accessibility access 2
  // Access: Partially Accessible

  const access_partial = 'partial';
  const note_partial = 'All parts of the library, with the exception of the computer classroom and community room, are wheelchair accessible';

  test('Location should be partially accessible', () => {
    render(
      <LocationAccessibility access={access_partial} note={note_partial} />
    );

    expect(screen.getByText(/Partially Accessible/)).toBeInTheDocument();

  });

  // Test accessibility access 3
  // Access: Not Accessible

  const access_none = 'none';

  test('Location should be not accessible', () => {
    render(
      <LocationAccessibility access={access_none} note={note} />
    );

    expect(screen.getByText('Not Accessible')).toBeInTheDocument();
  });

  // Test accessibility access 4
  // Access: Fullt Accessible
  // Note: none

  test('Location should be fully accessible and has no notes', () => {
    render(
      <LocationAccessibility access={access_full} note={note} />
    );

    expect(screen.getByText('Fully Accessible')).toBeInTheDocument();
  });

});


// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <LocationAccessibility access={access_full} note={note} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
