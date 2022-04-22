import React from "react";
// Components
import { default as SharedPageContainer } from "./../../shared/layouts/PageContainer";
import Hero from "./../Hero";
import SearchHeader from "./../../shared/SearchHeader";
import SearchForm from "./../SearchForm";
import Menu from "./../../ds-prototypes/Menu";
import {
  Box,
  BreadcrumbsTypes,
  HeadingLevels,
} from "@nypl/design-system-react-components";
// Config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";
import {
  articlesDatabasesSidebarMenu,
  railMenuContent,
} from "./../../../__content/menus";

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
    {
      text: "Articles & Databases",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
    },
  ];

  const newBreadcrumbs = breadcrumbs
    ? [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;

  const ContentHeader = (
    <>
      <Hero />
      <SearchHeader>
        <SearchForm />
      </SearchHeader>
    </>
  );

  return (
    <SharedPageContainer
      wrapperClass="nypl--research"
      metaTags={metaTags}
      {...(showContentHeader && {
        contentHeader: ContentHeader,
      })}
      breadcrumbs={newBreadcrumbs}
      breadcrumbsColor={BreadcrumbsTypes.Research}
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide="right"
      contentSecondary={
        <>
          {articlesDatabasesSidebarMenu.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel={HeadingLevels.Two}
                headingColor={"#00838A"}
                headingDecoration={"underline"}
                title={menu.title}
                // @ts-ignore
                items={menu.items}
                orientation={"vertical"}
              />
            );
          })}
        </>
      }
      contentBottom={
        <Box
          display={{ md: "flex" }}
          justifyContent={{ md: "space-between" }}
          flexFlow={{ md: "row nowrap" }}
          maxWidth={{ md: "800px" }}
          mb="l"
        >
          {railMenuContent.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel={HeadingLevels.Three}
                headingColor={"#00838A"}
                title={menu.title}
                // @ts-ignore
                items={menu.items}
                menuItemDecoration={false}
                orientation={"horizontal"}
              />
            );
          })}
        </Box>
      }
    />
  );
}

export default PageContainer;
