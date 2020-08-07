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

/*
it('should not have basic accessibility issues', async () => {
  const { container } = render(<BottomPromo />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
*/
