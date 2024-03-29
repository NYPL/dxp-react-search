import React from "react";
// Components
import { default as SharedPageContainer } from "../../shared/layouts/PageContainer";
import Menu from "../../ds-prototypes/Menu";
import { FormContextProvider } from "./../../../context/FormContext";
// Config
import { railMenuContent } from "../../../__content/menus";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

type RequestVisitPageContainerProps = {
  showContentHeader?: boolean;
  contentHeader?: React.ReactNode;
  contentPrimary: React.ReactNode;
};

function PageContainer({
  contentHeader,
  contentPrimary,
  showContentHeader,
}: RequestVisitPageContainerProps) {
  return (
    <FormContextProvider>
      <SharedPageContainer
        metaTags={{
          title: "Locations: Schedule a Visit",
          description:
            "The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.",
        }}
        breadcrumbs={[
          {
            text: "Home",
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
          },
          {
            text: "Locations",
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}/locations`,
          },
          {
            text: "Request a Class Visit or Group Tour",
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}/locations/request-visit`,
          },
        ]}
        breadcrumbsType="locations"
        wrapperClass="nypl--locations"
        {...(showContentHeader && {
          contentHeader: contentHeader,
        })}
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
                  headingLevel="h3"
                  headingColor={"#c60917"}
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
    </FormContextProvider>
  );
}

export default PageContainer;
