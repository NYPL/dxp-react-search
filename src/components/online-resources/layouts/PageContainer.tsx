import React from "react";
// Components
import {
  default as SharedPageContainer,
  MetaTags,
  BreadcrumbsItem,
} from "./../../shared/layouts/PageContainer";
import Hero from "./../Hero";
import SearchHeader from "./../../shared/SearchHeader";
import SearchForm from "./../SearchForm";
import Menu from "./../../ds-prototypes/Menu";
import { Box } from "@nypl/design-system-react-components";
// Config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../utils/config";
import {
  articlesDatabasesSidebarMenu,
  railMenuContent,
} from "./../../../__content/menus";

type OnlineResourcePageContainerProps = {
  metaTags?: MetaTags;
  breadcrumbs?: BreadcrumbsItem[];
  contentPrimary: React.ReactNode;
  showContentHeader: boolean;
};

function PageContainer({
  metaTags,
  breadcrumbs,
  contentPrimary,
  showContentHeader,
}: OnlineResourcePageContainerProps) {
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
      breadcrumbsType="research"
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
                headingLevel="h2"
                headingSize="heading5"
                headingColor={"#00838A"}
                headingDecoration={true}
                title={menu.title}
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
                headingLevel="h3"
                headingSize="heading5"
                headingColor={"#00838A"}
                title={menu.title}
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
