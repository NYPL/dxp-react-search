import React from "react";
// Apollo
import { withApollo } from "../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../redux/withRedux";
// Components
import PageContainer from "./../../../components/locations/RequestVisitForm/PageContainer";
import { Heading } from "@nypl/design-system-react-components";
import RequestVisitConfirmation from "../../../components/locations/RequestVisitForm/RequestVisitConfirmation";

function LocationsRequestVisitConfirmationPage() {
  return (
    <PageContainer
      contentPrimary={
        <>
          <Heading
            level="one"
            fontWeight="medium"
            text="Request a Class Visit or Group Tour"
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
