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
    contentSecondary,
    sidebarSide,
    showSidebar
  } = props;

  let contentPrimaryClass = 'content-primary';
  if (showSidebar) {
    if (sidebarSide === 'right') {
      contentPrimaryClass = `${contentPrimaryClass} content-primary--with-sidebar-right`;
    } else if (sidebarSide === 'left') {
      contentPrimaryClass = `${contentPrimaryClass} content-primary--with-sidebar-left`;
    }
  }
  
  // @TODO Not using this currently, should we?
  let hasSidebar = false;
  if (
    showSidebar
    && sidebarSide === 'right'
    || sidebarSide === 'left'
  ) {
    hasSidebar = true;
  }

  // ClassName logic for 'main' element
  let mainClassName = 'main';
  if (showSidebar) mainClassName += ' main--with-sidebar';
  if (!contentHeader) mainClassName += ' main--no-content-header';

  return (
    <Fragment>
      {metaTags &&
        <Meta
          title={metaTags.title}
          description={metaTags.description}
          url={metaTags.url}
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
        <main 
          id="main-content" 
          className={mainClassName}
        >
          {contentHeader &&
            <div className="content-header">
              {contentHeader}
            </div>
          }
          {contentSecondary && showSidebar && sidebarSide === "left" && 
            <div className='content-secondary content-secondary--with-sidebar-left'>
              {contentSecondary}
            </div>
          }
          {contentPrimary &&
            <div id="page-container--content-primary" className={contentPrimaryClass}>
              {contentPrimary}
              {contentBottom &&
                <div className="content-bottom">
                  {contentBottom}
                </div>
              }
            </div>
          }
          {contentSecondary && showSidebar && sidebarSide === "right" && 
            <div className='content-secondary content-secondary--with-sidebar-right'>
              {contentSecondary}
            </div>
          }
        </main>
      </div>
    </Fragment>
  );
}

export default PageContainer;
