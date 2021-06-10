import React, { Fragment } from 'react';
// Components
import { default as SharedPageContainer } from './../../shared/layouts/PageContainer';
import Hero from './../Hero';
import SearchHeader from './../../shared/SearchHeader';
import SearchForm from './../SearchForm';
import SidebarMenus from './../SidebarMenus';
import RightRail from './../../shared/RightRail';

function PageContainer(props) {
  const { metaTags, contentPrimary } = props;

  return (
    <SharedPageContainer
      wrapperClass='nypl--research'
      metaTags={metaTags}
      contentHeader={
        <Fragment>
          <Hero />
          <SearchHeader>
            <SearchForm />
          </SearchHeader>
        </Fragment>
      }
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide='right'
      contentSecondary={
        <SidebarMenus />
      }
      contentBottom={
        <RightRail />
      }
    />
  );
}

export default PageContainer;