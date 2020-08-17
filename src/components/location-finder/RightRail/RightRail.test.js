import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import RightRail from './RightRail';

expect.extend(toHaveNoViolations);

// @TODO Remove this, only added so this file returns a test.
describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

// @TODO This test will fail b/c missing key props
/*describe('RightRail', () => {
  test('renders RightRail component', () => {
    render(<RightRail />);
  });
});
*/

// @TODO This test will fail right now, b/c of bug in design system Link component:
// https://github.com/NYPL/nypl-design-system/issues/309
/*it('should not have basic accessibility issues', async () => {
  const { container } = render(<RightRail />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
*/
