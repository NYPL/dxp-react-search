import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BottomPromo from './BottomPromo';

expect.extend(toHaveNoViolations);

describe('BottomPromo', () => {
  test('renders BottomPromo component', () => {
    render(<BottomPromo />);
  });
});

// @TODO This test will fail right now, b/c of bug in design system Link component:
// https://github.com/NYPL/nypl-design-system/issues/309
/*
it('should not have basic accessibility issues', async () => {
  const { container } = render(<BottomPromo />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
*/
