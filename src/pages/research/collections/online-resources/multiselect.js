import React, { Fragment, useState } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../../../redux/withRedux';
// Components
import PageContainer from './../../../../components/online-resources/layouts/PageContainer';
//import CheckboxList from './../../../../components/ds-prototypes/MultiSelect/CheckboxList';
//import MultiSelect from './../../../../components/ds-prototypes/MultiSelect/MultiSelect';
import MultiSelectWrapper from './../../../../components/ds-prototypes/MultiSelect/MultiSelectWrapper';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../../utils/config';

function MultiSelectTestPage() {
  /*function getMenuProps(props = {}) {
    return {
      'aria-controls': 'target',
      ...props,
    }
  }
  */

  /*const getMenuProps = (props = {}) => ({
    'aria-controls': 'target',
    ...props,
  })
  */

  //console.log(getTogglerProps())

  return (
    <PageContainer
      metaTags={{
        title: 'MultiSelect',
        description: 'MultiSelect!',
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}`
      }}
      contentPrimary={
        <Fragment>
          <MultiSelectWrapper />
        </Fragment>
      }
    />
  );
}

export default withApollo(
  withRedux((MultiSelectTestPage)), {
  ssr: true,
  redirects: false
});
