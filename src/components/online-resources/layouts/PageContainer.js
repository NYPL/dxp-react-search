import React, { Fragment } from "react";
// Components
import { default as SharedPageContainer } from "./../../shared/layouts/PageContainer";
import Hero from "./../Hero";
import SearchHeader from "./../../shared/SearchHeader";
import SearchForm from "./../SearchForm";
import SidebarMenusContent from "../SidebarMenus/content";
import Menu from "./../../ds-prototypes/Menu";
//
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import BottomMenuContent from "../../shared/BottomMenus/content";

function PageContainer(props) {
  const { metaTags, breadcrumbs, contentPrimary, showContentHeader } = props;

  // Default breadcrumbs for all online resources pages.
  const defaultBreadcrumbs = [
    {
      text: "Home",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
    },
    {
      text: "Research",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research`,
    },
    {
      text: "Collections",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research/collections`,
    },
  ];

  const newBreadcrumbs = breadcrumbs
    ? [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;

  const ContentHeader = (
    <Fragment>
      <Hero />
      <SearchHeader>
        <SearchForm />
      </SearchHeader>
    </Fragment>
  );

  return (
    <SharedPageContainer
      wrapperClass="nypl--research"
      metaTags={metaTags}
      {...(showContentHeader && {
        contentHeader: ContentHeader,
      })}
      breadcrumbs={newBreadcrumbs}
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide="right"
      contentSecondary={
        <>
          {SidebarMenusContent.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel={2}
                headingColor={"#00838A"}
                headingDecoration={"underline"}
                title={menu.title}
                items={menu.items}
                orientation={"vertical"}
              />
            );
          })}
        </>
      }
      contentBottom={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "row nowrap",
            maxWidth: "800px",
          }}
        >
          {BottomMenuContent.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel={3}
                headingColor={"#00838A"}
                title={menu.title}
                items={menu.items}
                menuItemDecoration={false}
                orientation={"horizontal"}
              />
            );
          })}
        </div>
      }
    />
  );
}

export default PageContainer;
