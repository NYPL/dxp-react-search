import React from "react";
// Components
import {
  default as SharedPageContainer,
  PageContainerProps,
  BreadcrumbsItem,
} from "./../../shared/layouts/PageContainer";
import Menu from "./../../ds-prototypes/Menu";
import { Heading, Hero } from "@nypl/design-system-react-components";
import FilterBar from "./../../shared/FilterBar";
// Config/Utils
import blogsContent from "./../../../__content/blogs";
import { railMenuContent } from "../../../__content/menus";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { BLOGS_BASE_PATH } from "./../../../utils/config";

type BlogPageContainerProps = Omit<
  PageContainerProps,
  "breadcrumbsColor" | "wrapperClass" | "breadcrumbs"
> & {
  showFilterBar?: boolean;
  showContentHeader: boolean;
  breadcrumbs?: BreadcrumbsItem[];
};

function PageContainer({
  metaTags,
  breadcrumbs,
  contentPrimary,
  showFilterBar,
  showContentHeader,
}: BlogPageContainerProps) {
  const { meta } = blogsContent;

  // Default breadcrumbs for all online resources pages.
  const defaultBreadcrumbs = [
    {
      text: "Home",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
    },
    {
      text: "Blog",
      url: `${NEXT_PUBLIC_NYPL_DOMAIN}${BLOGS_BASE_PATH}`,
    },
  ];
  const newBreadcrumbs = breadcrumbs
    ? [...defaultBreadcrumbs, ...breadcrumbs]
    : defaultBreadcrumbs;

  const ContentHeader = (
    <>
      <Hero
        heroType="tertiary"
        heading={<Heading level="one" text={meta.title} />}
        subHeaderText={meta.description}
        backgroundColor="#E0E0E0"
        foregroundColor="#000000"
      />
      {showFilterBar && (
        <div style={{ padding: "2rem 0" }}>
          <div
            style={{ maxWidth: "1280px", padding: "0 1rem", margin: "0 auto" }}
          >
            <FilterBar
              id="blogs__filter-bar"
              label="Explore By:"
              routerPathname={`${BLOGS_BASE_PATH}/all`}
              groups={[
                {
                  id: "channel",
                  label: "Channels",
                  type: "taxonomy",
                  includeChildren: false,
                },
                {
                  id: "subject",
                  label: "Subjects",
                  type: "taxonomy",
                  limiter: "blog",
                  includeChildren: true,
                },
                {
                  id: "library",
                  label: "Libraries",
                  type: "content",
                  includeChildren: false,
                },
                {
                  id: "division",
                  label: "Divisions",
                  type: "content",
                  includeChildren: false,
                },
                {
                  id: "audience_by_age",
                  label: "Audience",
                  type: "taxonomy",
                  includeChildren: false,
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <SharedPageContainer
      wrapperClass="nypl--articles"
      {...(metaTags && {
        metaTags: metaTags,
      })}
      {...(showContentHeader && {
        contentHeader: ContentHeader,
      })}
      breadcrumbs={newBreadcrumbs}
      breadcrumbsColor="blogs"
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
    />
  );
}

export default PageContainer;