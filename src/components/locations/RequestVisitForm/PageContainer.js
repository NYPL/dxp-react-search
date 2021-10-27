import React from "react";
// Components
import { default as SharedPageContainer } from "../../shared/layouts/PageContainer";
import BottomMenuContent from "../../shared/BottomMenus/content";
import Menu from "../../ds-prototypes/Menu";
import { FormContextProvider } from "./../../../context/FormContext";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function PageContainer(props) {
  const { contentHeader, contentPrimary, showContentHeader } = props;
  return (
    <FormContextProvider>
      <SharedPageContainer
        metaTags={{
          title: "Locations: Schedule a Visit",
          description:
            "The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.",
          url: "https://www.nypl.org/locations",
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
        ]}
        wrapperClass="nypl--locations"
        {...(showContentHeader && {
          contentHeader: contentHeader,
        })}
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
                  headingColor={"#700000"}
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
    </FormContextProvider>
  );
}

export default PageContainer;
