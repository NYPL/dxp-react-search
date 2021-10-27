import React, { Fragment } from "react";
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
    />
  );
}

export default withApollo(withRedux(LocationsRequestVisitPage), {
  ssr: true,
  redirects: false,
});
