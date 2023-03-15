import React from "react";
// Components
import {
  default as SharedPageContainer,
  PageContainerProps,
  BreadcrumbsItem,
} from "./../../shared/layouts/PageContainer";
import Menu from "./../../ds-prototypes/Menu";
import { Heading, Hero } from "@nypl/design-system-react-components";
// Config/Utils
import { railMenuContent } from "../../../__content/menus";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { PRESS_BASE_PATH } from "./../../../utils/config";

type PressPageContainerProps = Omit<
  PageContainerProps,
  "breadcrumbsType" | "wrapperClass" | "breadcrumbs"
> & {
  showContentHeader: boolean;
  breadcrumbs?: BreadcrumbsItem[];
};

function PageContainer({
  metaTags,
  breadcrumbs,
  contentPrimary,
  showContentHeader,
}: PressPageContainerProps) {
  // Default breadcrumbs for all online resources pages.
  const defaultBreadcrumbs = [
    {
      text: "Home",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
    },
    {
      text: "Press Releases",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}${PRESS_BASE_PATH}`,
    },
  ];

  const newBreadcrumbs = breadcrumbs
    ? [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;

  const ContentHeader = (
    <>
      <Hero
        heroType="tertiary"
        heading={<Heading level="one" text="Press Releases" />}
        backgroundColor="var(--nypl-colors-ui-gray-light-cool)"
        foregroundColor="var(--nypl-colors-ui-black)"
      />
    </>
  );

  return (
    <SharedPageContainer
      wrapperClass="nypl--articles"
      metaTags={metaTags}
      {...(showContentHeader && {
        contentHeader: ContentHeader,
      })}
      breadcrumbs={newBreadcrumbs}
      breadcrumbsType="blogs"
      contentPrimary={contentPrimary}
      showSidebar={true}
      sidebarSide="right"
      contentSecondary={
        <>
          {railMenuContent.map((menu) => {
            return (
              <Menu
                id={menu.id}
                key={menu.id}
                headingLevel="three"
                headingColor="#000"
                title={menu.title}
                items={menu.items}
                menuItemDecoration={false}
                orientation="vertical"
              />
            );
          })}
        </>
      }
    />
  );
}

export default PageContainer;
