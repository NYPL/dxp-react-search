import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import RightRail from './RightRail';

expect.extend(toHaveNoViolations);

/*describe('RightRail', () => {
  test('renders RightRail component', () => {
    render(<RightRail />);
  });
});
*/

/*it('should not have basic accessibility issues', async () => {
  const { container } = render(<RightRail />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
*/
