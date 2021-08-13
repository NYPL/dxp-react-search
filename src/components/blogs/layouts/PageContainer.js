import React, { Fragment } from 'react';
// Components
import { default as SharedPageContainer } from './../../shared/layouts/PageContainer';
import Hero from './../Hero';
import RightRail from './../../shared/RightRail';
import BottomMenuContent from './../../shared/BottomMenus/content';

const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function PageContainer(props) {
  const { metaTags, breadcrumbs, contentPrimary, showContentHeader } = props;
  
  // Default breadcrumbs for all online resources pages.
  const defaultBreadcrumbs = [
    {
      text: 'Home',
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}`
    },
    {
      text: 'Blogs',
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research`
    }
  ];

  const newBreadcrumbs = breadcrumbs ? 
    [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;
  
  const ContentHeader =
    <Fragment>
      <Hero />
    </Fragment>

  return (
    <SharedPageContainer
      wrapperClass='nypl--articles'
      metaTags={metaTags}
      {...(showContentHeader && { 
        contentHeader: ContentHeader 
      })}
      breadcrumbs={newBreadcrumbs}
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide='right'
      contentSecondary={
        <RightRail menuContent={BottomMenuContent} orientation="vertical" />
      }
    />
  );
}

export default PageContainer;