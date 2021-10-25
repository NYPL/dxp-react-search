import React, { Fragment } from "react";
// Apollo
import { withApollo } from "../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../redux/withRedux";
// Components
import PageContainer from "../../../components/shared/layouts/PageContainer";
import BottomMenuContent from "../../../components/shared/BottomMenus/content";
import Menu from "../../../components/ds-prototypes/Menu";
import { Heading } from "@nypl/design-system-react-components";
import RequestVisitForm from "../../../components/locations/RequestVisitForm/RequestVisitForm";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function LocationsRequestVisitPage() {
  return (
    <PageContainer
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
      contentPrimary={
        <>
          <Heading
            className="request-visit__header"
            level={1}
            text="Request a Group Visit"
          />
          <p className="request-visit__description">
            Volutpat tristique curabitur sapien non etiam fringilla magna luctus
            eros, condimentum suscipit dictum nascetur ullamcorper purus nec
            risus elit, eleifend mollis fames.
          </p>
          <RequestVisitForm />
        </>
      }
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
  );
}

export default withApollo(withRedux(LocationsRequestVisitPage), {
  ssr: true,
  redirects: false,
});