import React, { Fragment } from "react";
import Meta from "../Meta";
import {
  Breadcrumbs,
  ColorVariants,
  DSProvider,
} from "@nypl/design-system-react-components";
import s from "./PageContainer.module.css";

interface PageContainerProps {
  metaTags: MetaTags;
  breadcrumbs: BreadcrumbsItem[];
  breadcrumbsColor: ColorVariants;
  wrapperClass: string;
  contentHeader: React.ReactNode;
  contentPrimary: React.ReactNode;
  contentBottom: React.ReactNode;
  contentSecondary?: React.ReactNode;
  sidebarSide?: SidebarSides;
  showSidebar?: boolean;
}

export enum SidebarSides {
  Right = "right",
  Left = "left",
}

export type BreadcrumbsItem = {
  url: string;
  text: string | React.ReactNode;
};

export type MetaTags = {
  title: string;
  description: string;
  url: string;
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
          url={metaTags.url}
          imageUrl={metaTags.imageUrl}
        />
      )}
      <div className={`${wrapperClass} nypl-ds`}>
        <DSProvider>
          <Breadcrumbs
            breadcrumbsData={breadcrumbs}
            colorVariant={breadcrumbsColor}
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
