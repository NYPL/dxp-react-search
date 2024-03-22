import React from "react";
import Meta from "../Meta";
import {
  BreadcrumbsTypes,
  DSProvider,
} from "@nypl/design-system-react-components";
import Breadcrumbs from "./Breadcrumbs";
import s from "./PageContainer.module.css";

export interface PageContainerProps {
  metaTags?: MetaTags;
  breadcrumbs: BreadcrumbsItem[];
  breadcrumbsType?: BreadcrumbsTypes;
  breadcrumbsColor?: string;
  wrapperClass: string;
  contentHeader?: React.ReactNode;
  contentPrimary: React.ReactNode;
  contentBottom?: React.ReactNode;
  contentSecondary?: React.ReactNode;
  sidebarSide?: "right" | "left";
  showSidebar?: boolean;
}

export type BreadcrumbsItem = {
  url: string;
  text: string | React.ReactNode;
};

export type MetaTags = {
  title: string;
  description: string;
  imageUrl?: string;
};

function PageContainer({
  metaTags,
  breadcrumbs,
  breadcrumbsColor,
  wrapperClass,
  contentHeader,
  contentPrimary,
  contentBottom,
  contentSecondary,
  sidebarSide,
  showSidebar,
}: PageContainerProps) {
  let contentPrimaryClass = "grid";
  if (showSidebar) {
    if (sidebarSide === "right") {
      contentPrimaryClass = "gridWithRightSidebar";
    } else if (sidebarSide === "left") {
      contentPrimaryClass = "gridWithLeftSidebar";
    }
  }

  return (
    <>
      {metaTags && (
        <Meta
          title={metaTags.title}
          description={metaTags.description}
          imageUrl={metaTags.imageUrl}
        />
      )}
      <div className={`${wrapperClass} nypl-ds`}>
        <DSProvider>
          <Breadcrumbs
            items={breadcrumbs}
            {...(breadcrumbsColor && {
              color: breadcrumbsColor,
            })}
            pageTitle={metaTags?.title}
          />
          <main id="main-content">
            {contentHeader && <div>{contentHeader}</div>}
            <div className={s[contentPrimaryClass]}>
              {contentPrimary && (
                <div
                  id="page-container--content-primary"
                  className={s.contentPrimary}
                >
                  {contentPrimary}
                </div>
              )}
              {contentSecondary && showSidebar && sidebarSide === "right" && (
                <div
                  id="page-container--content-secondary"
                  className={s.contentSecondary}
                >
                  {contentSecondary}
                </div>
              )}
              {contentBottom && (
                <div className={s.contentBottom}>{contentBottom}</div>
              )}
            </div>
          </main>
        </DSProvider>
      </div>
    </>
  );
}

export default PageContainer;
