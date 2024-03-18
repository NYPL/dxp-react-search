import React from "react";
// Apollo
import withApollo from "./../../../apollo/withApollo";
// Redux
import { withRedux } from "../../../redux/withRedux";
// Components
import PageContainer from "./../../../components/locations/RequestVisitForm/PageContainer";
import Heading from "./../../../components/shared/Heading";
import RequestVisitConfirmation from "../../../components/locations/RequestVisitForm/RequestVisitConfirmation";

function LocationsRequestVisitConfirmationPage() {
  return (
    <PageContainer
      contentPrimary={
        <>
          <Heading className="request-visit__header" level="h1">
            Request a Class Visit or Group Tour
          </Heading>
          <RequestVisitConfirmation />
        </>
      }
    />
  );
}
export default withApollo(withRedux(LocationsRequestVisitConfirmationPage));
