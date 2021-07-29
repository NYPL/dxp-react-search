import React, { Fragment } from 'react';
// Apollo
import { withApollo } from '../../../../apollo/client/withApollo';
// Redux
import { withRedux } from '../../../../redux/withRedux';
// Components
import PageContainer from '../../../../components/online-resources/layouts/PageContainer';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from '../../../../utils/config';
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function OnlineResourcesFindJournalsTitlePage() {
  return (
    <PageContainer
      metaTags={{
        title: 'Find E-Journals and Scholarly E-books by Title in Databases | New York Public Library',
        description: 'Use the resources below to find which databases have the full text of specific magazines or journals.',
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}/verify`
      }}
      breadcrumbs={[
        {
          text: 'Online Resources',
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research/collections/online-resources`
        }
      ]}
      showContentHeader={false}
      contentPrimary={
        <div>
          <h1>Find E-Journals and Scholarly E-books by Title in Databases</h1>
          <p>Use the resources below to find which databases have the full text of specific magazines or journals.</p>
          <p>
            <a href="http://tm9qt7lg9g.search.serialssolutions.com/" rel="nofollow">
              Full-text Journals and Scholarly E-books&nbsp;(from Home)
            </a>
          </p>
          <p>
            <a href="http://wu9fb9wh4a.search.serialssolutions.com/" rel="nofollow">
              Full-text Journals and Scholarly E-Books (on-site in the Library)
            </a>
          </p>
          <p>To find magazines, newspapers and journals not available electronically search the Catalog.</p>
          <p>
            <a href="https://catalog.nypl.org/search/s">Journal Title Search in the NYPL Catalog</a>
          </p>
          <br />
          <p>*During the temporary closure of The New York Public Library's locations, we are offering remote access 
            to additional databases, which are not regularly available from Home. Please checkout this page for more details. 
            Please note that the links on this page will not reflect the new databases we just added for remote access.
          </p>
        </div>
      }
    />
  );
}

export default withApollo(
  withRedux((OnlineResourcesFindJournalsTitlePage)), { 
    ssr: true, 
    redirects: false 
  });
