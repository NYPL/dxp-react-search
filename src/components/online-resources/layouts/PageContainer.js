import React, { Fragment } from 'react';
// Components
import { default as SharedPageContainer } from './../../shared/layouts/PageContainer';
import Hero from './../Hero';
import SearchHeader from './../../shared/SearchHeader';
import SearchForm from './../SearchForm';
import SidebarMenusContent from '../SidebarMenus/content';
import BottomMenuContent from '../../shared/BottomMenus/content';
import RightRail from './../../shared/RightRail';
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
      text: 'Research',
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research`
    },
    {
      text: 'Collections',
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research/collections`
    }
  ];

  const newBreadcrumbs = breadcrumbs ? 
    [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;
  
  const ContentHeader =
    <Fragment>
      <Hero />
      <SearchHeader>
        <SearchForm />
      </SearchHeader>
    </Fragment>

  return (
    <SharedPageContainer
      wrapperClass='nypl--research'
      metaTags={metaTags}
      {...(showContentHeader && { 
        contentHeader: ContentHeader 
      })}
      breadcrumbs={newBreadcrumbs}
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide='right'
      contentSecondary={
        <RightRail menuContent={SidebarMenusContent} orientation="vertical" />
      }
      contentBottom={
        <RightRail menuContent={BottomMenuContent} orientation="horizontal" />
      }
    />
  );
}

export default PageContainer;