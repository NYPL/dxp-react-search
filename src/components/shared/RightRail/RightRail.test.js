import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import RightRail from './RightRail';
import SidebarMenusContent from './../../online-resources/SidebarMenus/content';

expect.extend(toHaveNoViolations);

describe('RightRail', () => {
  test('renders RightRail component', () => {
    render(
      <RightRail 
        menuContent={SidebarMenusContent} 
        orientation="vertical" 
      />
    );
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <RightRail 
        menuContent={SidebarMenusContent} 
        orientation="vertical" 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
