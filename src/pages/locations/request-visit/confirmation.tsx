import React from "react";
// Apollo
import { withApollo } from "../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../redux/withRedux";
// Components
import PageContainer from "./../../../components/locations/RequestVisitForm/PageContainer";
import BottomMenuContent from "../../../components/shared/BottomMenus/content";
import Menu from "../../../components/ds-prototypes/Menu";
import { Heading } from "@nypl/design-system-react-components";
import RequestVisitConfirmation from "../../../components/locations/RequestVisitForm/RequestVisitConfirmation";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function LocationsRequestVisitConfirmationPage() {
  return (
    <PageContainer
      contentPrimary={
        <>
          <Heading
            className="request-visit__header"
            level={1}
            text="Request a Group Visit"
          />
          <RequestVisitConfirmation />
        </>
      }
    />
  );
}

export default withApollo(withRedux(LocationsRequestVisitConfirmationPage), {
  ssr: true,
  redirects: false,
});
