import React, { Fragment } from "react";
import Meta from "../Meta";
import { Breadcrumbs, DSProvider } from "@nypl/design-system-react-components";
import s from "./PageContainer.module.css";

function PageContainer(props) {
  const {
    metaTags,
    breadcrumbs,
    wrapperClass,
    contentHeader,
    contentPrimary,
    contentBottom,
    contentSecondary,
    sidebarSide,
    showSidebar,
  } = props;

  let contentPrimaryClass = "grid";
  if (showSidebar) {
    if (sidebarSide === "right") {
      contentPrimaryClass = "gridWithRightSidebar";
    } else if (sidebarSide === "left") {
      contentPrimaryClass = "gridWithLeftSidebar";
    }
  }

  return (
    <Fragment>
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
          <Breadcrumbs breadcrumbs={breadcrumbs} />
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
    </Fragment>
  );
}

export default PageContainer;
