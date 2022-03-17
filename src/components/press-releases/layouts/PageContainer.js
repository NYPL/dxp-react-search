import React from "react";
// Components
import { default as SharedPageContainer } from "./../../shared/layouts/PageContainer";
import Menu from "./../../ds-prototypes/Menu";
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
import { PRESS_BASE_PATH } from "./../../../utils/config";

function PageContainer(props) {
  const { metaTags, breadcrumbs, contentPrimary, showContentHeader } = props;
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
        heroType={HeroTypes.Tertiary}
        heading={<Heading level={HeadingLevels.One} text={"Press Releases"} />}
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
      breadcrumbsColor={ColorVariants.Blogs}
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
                headingLevel={HeadingLevels.Three}
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
