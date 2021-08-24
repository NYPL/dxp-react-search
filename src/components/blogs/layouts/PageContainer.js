import React, { Fragment } from "react";
// Components
import { default as SharedPageContainer } from "./../../shared/layouts/PageContainer";
import Menu from "./../../ds-prototypes/Menu";
import { Hero } from "@nypl/design-system-react-components";
//
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import blogsContent from "./../../../__content/blogs";
import BottomMenuContent from "./../../shared/BottomMenus/content";

function PageContainer(props) {
  const { metaTags, breadcrumbs, contentPrimary, showContentHeader } = props;
  const { title, description } = blogsContent;

  // Default breadcrumbs for all online resources pages.
  const defaultBreadcrumbs = [
    {
      text: "Home",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
    },
    {
      text: "Blogs",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research`,
    },
  ];

  const newBreadcrumbs = breadcrumbs
    ? [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;

  const ContentHeader = (
    <Hero
      heroType={"TERTIARY"}
      heading={<h1>{title}</h1>}
      subHeaderText={description}
      backgroundColor="#E0E0E0"
      foregroundColor="#000000"
    />
  );

  return (
    <SharedPageContainer
      wrapperClass="nypl--articles"
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
          {BottomMenuContent.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel={3}
                headingColor={"#000"}
                title={menu.title}
                items={menu.items}
                menuItemDecoration={false}
                orientation={"vertical"}
              />
            );
          })}
        </>
      }
    />
  );
}

export default PageContainer;
