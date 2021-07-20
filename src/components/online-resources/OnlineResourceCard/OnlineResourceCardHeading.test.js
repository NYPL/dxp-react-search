import React from 'react';
import { screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { render } from './../../../../testHelper/customRtlRender';
import OnlineResourceCardHeading from './OnlineResourceCardHeading';

expect.extend(toHaveNoViolations);

describe('OnlineResourceCardHeading Component', () => {
  test('As an offsite patron, I should not have access to an onsite only resource link.', () => {
    render(
      <OnlineResourceCardHeading
        id={'test-id'}
        name={'Test Card Title'}
        accessibleFrom={['onsite']}
        accessLocations={[
          {
            id: "50b5b1c6-e01f-4728-befb-90578bb0d1d4",
            name: "Stephen A. Schwarzman Building",
            url: "http://localhost:8080/locations/schwarzman"
          }
        ]} 
        resourceUrl={'https://gooogle.com'}
        slug={'/slug'}
        allLocationMatches={null}
      />
    );

    expect(screen.getByText("Test Card Title")).toBeInTheDocument();
    const linkElement = screen.queryByText('Test Card Title').closest('a');
    expect(linkElement).toBeNull()
  }); 

  test('As an onsite patron, I should have access to an onsite only resource link.', () => {
    render(
      <OnlineResourceCardHeading
        id={'test-id'}
        name={'Test Card Title'}
        accessibleFrom={['onsite']}
        accessLocations={[
          {
            id: "50b5b1c6-e01f-4728-befb-90578bb0d1d4",
            name: "Stephen A. Schwarzman Building",
            url: "http://localhost:8080/locations/schwarzman"
          }
        ]} 
        resourceUrl={'https://gooogle.com'}
        slug={'/slug'}
        allLocationMatches={{
          "items": [
            {
              id: "whatever",
              name: "Stephen A. Schwarzman Building",
              locationId: '50b5b1c6-e01f-4728-befb-90578bb0d1d4'
            }
          ]
        }}
      />
    );

    expect(screen.getByText("Test Card Title")).toBeInTheDocument();
    expect(screen.getByText('Test Card Title').closest('a'))
      .toHaveAttribute('href', 'https://gooogle.com')
  }); 
  
  test('As an offsite patron, I should have access to an offsite resource link.', () => {
    render(
      <OnlineResourceCardHeading
        id={'test-id'}
        name={'Test Card Title'}
        accessibleFrom={['offsite']}
        accessLocations={[
          {
            id: "50b5b1c6-e01f-4728-befb-90578bb0d1d4",
            name: "Stephen A. Schwarzman Building",
            url: "http://localhost:8080/locations/schwarzman"
          }
        ]} 
        resourceUrl={'https://gooogle.com'}
        slug={'/slug'}
        allLocationMatches={null}
      />
    );

    expect(screen.getByText("Test Card Title")).toBeInTheDocument();
    expect(screen.getByText('Test Card Title').closest('a'))
      .toHaveAttribute('href', 'https://gooogle.com')
  });
});

/*test('As an offsite patron, I should have access to a resource link that is both onsite and offsite', () => {
});
*/

// Accessbiility tests.
it('should not have basic accessibility issues', async () => {
  const { container } = render(
    <OnlineResourceCardHeading
      id={'test-id'}
      name={'Test Card Title'}
      accessibleFrom={['offsite']}
      accessLocations={[
        {
          id: "50b5b1c6-e01f-4728-befb-90578bb0d1d4",
          name: "Stephen A. Schwarzman Building",
          url: "http://localhost:8080/locations/schwarzman"
        }
      ]} 
      resourceUrl={'https://gooogle.com'}
      slug={'/slug'}
      allLocationMatches={null}
    />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});