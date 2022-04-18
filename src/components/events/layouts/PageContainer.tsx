import React from "react";
// Components
import {
  default as SharedPageContainer,
  SidebarSides,
} from "../../shared/layouts/PageContainer";
import Menu from "../../ds-prototypes/Menu";
import {
  Heading,
  HeadingLevels,
  Hero,
  HeroTypes,
  ColorVariants,
} from "@nypl/design-system-react-components";
// Config/Utils
import { railMenuContent } from "../../../__content/menus";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { EVENTS_BASE_PATH } from "../../../utils/config";

function PageContainer({
  metaTags,
  breadcrumbs,
  contentHeader,
  contentPrimary,
  showFilterBar,
  showContentHeader,
}: any) {
  // Default breadcrumbs for all events pages.
  const defaultBreadcrumbs = [
    {
      text: "Home",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
    },
    {
      text: "Events",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}${EVENTS_BASE_PATH}`,
    },
  ];

  const newBreadcrumbs = breadcrumbs
    ? [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;

  return (
    <SharedPageContainer
      wrapperClass="nypl--articles"
      metaTags={metaTags}
      breadcrumbs={newBreadcrumbs}
      breadcrumbsColor={ColorVariants.Blogs}
      {...(showContentHeader &&
        contentHeader && {
          contentHeader: contentHeader,
        })}
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide={SidebarSides.Right}
      contentSecondary={
        <>
          {railMenuContent.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel={HeadingLevels.Three}
                headingColor={"#000"}
                title={menu.title}
                // @ts-ignore
                items={menu.items}
                menuItemDecoration={false}
                orientation={"vertical"}
              />
            );
          })}
        </>
      }
      contentBottom={null}
    />
  );
}

export default PageContainer;
