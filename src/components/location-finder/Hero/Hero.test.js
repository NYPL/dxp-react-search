import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Hero from './Hero';

expect.extend(toHaveNoViolations);

describe('Hero', () => {
  test('renders Hero component', () => {
    render(<Hero />);
  });
});

it('should not have basic accessibility issues', async () => {
  const { container } = render(<Hero />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
