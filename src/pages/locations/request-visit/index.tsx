import React from "react";
// Apollo
import { withApollo } from "../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../redux/withRedux";
// Components
import { Box, Heading } from "@nypl/design-system-react-components";
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
            level="one"
            fontWeight="medium"
            text="Request a Class Visit or Group Tour"
          />
          <Box maxW="620px" m="0" mb="s">
            Discover the Library’s wide array of free resources, classes,
            events, and more! Join us at your local branch to learn more about
            library cards, searching the catalog, and other NYPL services.
            Request an in-person or virtual class visit or group tour now.
          </Box>
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
