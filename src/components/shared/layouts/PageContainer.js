import React, { Fragment } from 'react';
import Meta from './../../../components/shared/Meta';
import { Breadcrumbs } from '@nypl/design-system-react-components';

function PageContainer(props) {
  const {
    metaTags,
    wrapperClass,
    contentHeader,
    contentPrimary,
    contentBottom,
    sidebarSide,
    showSidebar
  } = props;

  return (
    <Fragment>
      {metaTags &&
        <Meta
          title={metaTags.title}
          description={metaTags.description}
        />
      }
      <div className={`${wrapperClass} nypl-ds`}>
        <Breadcrumbs
          breadcrumbs={[
            {
              text: 'Home',
              url: 'https://www.nypl.org/'
            }
          ]}
        />
        <main id="main-content" className="main">
          {contentHeader &&
            <div className="content-header">
              {contentHeader}
            </div>
          }
          {contentPrimary &&
            <div className="content-primary">
              {contentPrimary}
            </div>
          }
          
          {contentBottom &&
            <div className="content-bottom">
              {contentBottom}
            </div>
          }
        </main>
      </div>
    </Fragment>
  );
}

export default PageContainer;