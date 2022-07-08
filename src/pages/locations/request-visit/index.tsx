import React from "react";
// Apollo
import withApollo from "./../../../apollo/withApollo";
import { initializeApollo } from "./../../../apollo/withApollo/apollo";
import { LOCATIONS_QUERY } from "./../../../components/locations/RequestVisitForm/FormFields/LibraryFormField";
// Redux
//import { withRedux } from "../../../redux/withRedux";
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
            level="one"
            text="Request a Class Visit or Group Tour"
          />
          <p className="request-visit__description">
            Discover the Library’s wide array of free resources, classes,
            events, and more! Join us at your local branch to learn more about
            library cards, searching the catalog, and other NYPL services.
            Request an in-person or virtual class visit or group tour now.
          </p>
          <RequestVisitForm />
        </>
      }
    />
  );
}

// We prefetch the gql queries and populate the initial apollo cache.
// Components still have gql queries in them, but will already have data
// on first load, and will req data changes client side, the same as they would using ssr.
// @TODO query params in url don't pre-populate the locations select list.
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: LOCATIONS_QUERY,
    variables: {
      contentType: "library",
      limit: 125,
      pageNumber: 1,
      filter: {
        libraryType: {
          fieldName: "field_ts_library_type",
          operator: "IN",
          value: ["hub", "neighborhood"],
        },
      },
      sort: {
        field: "title",
        direction: "ASC",
      },
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 120,
    //fallback: false,
  };
}

export default withApollo(LocationsRequestVisitPage);

// export default withApollo(withRedux(LocationsRequestVisitPage), {
//   ssr: true,
//   redirects: false,
// });
