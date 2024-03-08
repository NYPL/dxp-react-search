import React from "react";
import Meta from "../Meta";
import { MetaProps as MetaTags } from "./../Meta/Meta";
import {
  Breadcrumbs,
  BreadcrumbsTypes,
  DSProvider,
} from "@nypl/design-system-react-components";
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

function PageContainer({
  metaTags,
  breadcrumbs,
  breadcrumbsType = "whatsOn",
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
            breadcrumbsData={breadcrumbs}
            breadcrumbsType={breadcrumbsType}
            {...(breadcrumbsColor && {
              backgroundColor: breadcrumbsColor,
            })}
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
