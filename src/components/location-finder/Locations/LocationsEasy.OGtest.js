import React from 'react';
import { render, cleanup } from '@testing-library/react';
/*import { cleanup } from '@testing-library/react';
import { render } from './../../../../testHelper/customRtlRender';
*/
import LocationsEasy from './LocationsEasy';
import {
  ApolloLoadingProvider,
  ApolloErrorProvider,
  ApolloMockedProvider,
} from './../../../../testHelper/apolloProviders';

afterEach(cleanup);

test('LocationsEasy', async () => {
  const { debug } = render(
    <ApolloMockedProvider>
      <LocationsEasy />
    </ApolloMockedProvider>
  );

  debug();
  await Promise.resolve();
  debug();
});
