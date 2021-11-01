import React from "react";
// Apollo
import { withApollo } from "../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../redux/withRedux";
// Components
import { Heading } from "@nypl/design-system-react-components";
import PageContainer from "./../../../components/locations/RequestVisitForm/PageContainer";
import RequestVisitForm from "../../../components/locations/RequestVisitForm/RequestVisitForm";
import RequestVisitFormError from "../../../components/locations/RequestVisitForm/RequestVisitFormError";

function LocationsRequestVisitPage() {
  return (
    <PageContainer
      showContentHeader={true}
      contentHeader={<RequestVisitFormError />}
      contentPrimary={
        <>
          <Heading
            className="request-visit__header"
            level={1}
            text="Request a Class Visit or Group Tour"
          />
          <p className="request-visit__description">
            We welcome the opportunity to meet with your class or
            group—virtually or in-person—to share information about the library
            and its wide range of resources.
          </p>
          <RequestVisitForm />
        </>
      }
    />
  );
}

export default withApollo(withRedux(LocationsRequestVisitPage), {
  ssr: true,
  redirects: false,
});
