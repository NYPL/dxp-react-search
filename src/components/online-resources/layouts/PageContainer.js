import React, { Fragment } from 'react';
// Components
import { default as SharedPageContainer } from './../../shared/layouts/PageContainer';
import Hero from './../Hero';
import SearchHeader from './../../shared/SearchHeader';
import SearchForm from './../SearchForm';
import SidebarMenusContent from '../SidebarMenus/content';
import BottomMenuContent from '../../shared/BottomMenus/content';
import RightRail from './../../shared/RightRail';

function PageContainer(props) {
  const { metaTags, contentPrimary, showContentHeader } = props;
  
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
