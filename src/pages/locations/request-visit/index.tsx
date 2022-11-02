import React from "react";
import { GetServerSidePropsContext } from "next";
// Apollo
import withApollo from "./../../../apollo/withApollo";
import { initializeApollo } from "./../../../apollo/withApollo/apollo";
import { LOCATIONS_QUERY } from "./../../../components/locations/RequestVisitForm/FormFields/LibraryFormField";
// Components
import { Heading } from "@nypl/design-system-react-components";
import PageContainer from "./../../../components/locations/RequestVisitForm/PageContainer";
import RequestVisitForm from "../../../components/locations/RequestVisitForm/RequestVisitForm";
import RequestVisitFormError from "../../../components/locations/RequestVisitForm/RequestVisitFormError";
// import withDrupal from "../../../apollo/with-drupal";

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
// on first load, and will req data changes client side, the same as they would using getInitialProps.
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  const locationsQuery = await apolloClient.query({
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

  // @TODO figure out how to make this code reuseable?
  // Handle errors.
  const responseInfo = await locationsQuery?.data?.allLocations?.responseInfo;
  if (responseInfo.httpStatus !== "SUCCESS") {
    // Set the response code headers.
    context.res.statusCode = responseInfo.httpStatusCode;
    // Return the response http status code, which will get picked up by Error pg.
    return {
      props: {
        errorCode: responseInfo.httpStatusCode,
      },
    };
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

// export const getServerSideProps: GetServerSideProps = withDrupal(
//   async (context: GetServerSidePropsContext) => {
//     const apolloClient = initializeApollo();

//     const locationsQuery = await apolloClient.query({
//       query: LOCATIONS_QUERY,
//       variables: {
//         contentType: "library",
//         limit: 125,
//         pageNumber: 1,
//         filter: {
//           libraryType: {
//             fieldName: "field_ts_library_type",
//             operator: "IN",
//             value: ["hub", "neighborhood"],
//           },
//         },
//         sort: {
//           field: "title",
//           direction: "ASC",
//         },
//       },
//     });

//     //const responseInfo = await locationsQuery?.data?.allLocations?.responseInfo;
//     // @ts-ignore
//     context.res.responseInfo = await locationsQuery?.data?.allLocations
//       ?.responseInfo;

//     return {
//       props: {
//         initialApolloState: apolloClient.cache.extract(),
//       },
//     };
//   },
//   { fetchType: "ssr" }
// );

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const apolloClient = initializeApollo();

//   const locationsQuery = await apolloClient.query({
//     query: LOCATIONS_QUERY,
//     variables: {
//       contentType: "library",
//       limit: 125,
//       pageNumber: 1,
//       filter: {
//         libraryType: {
//           fieldName: "field_ts_library_type",
//           operator: "IN",
//           value: ["hub", "neighborhood"],
//         },
//       },
//       sort: {
//         field: "title",
//         direction: "ASC",
//       },
//     },
//   });

//   const responseInfo = await locationsQuery?.data?.allLocations?.responseInfo;
//   if (responseInfo.httpStatus !== "SUCCESS") {
//     // Set the response code headers.
//     context.res.statusCode = responseInfo.httpStatusCode;
//     // Return the response http status code, which will get picked up by Error pg.
//     return {
//       props: {
//         errorCode: responseInfo.httpStatusCode,
//       },
//     };
//   }

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }

export default withApollo(LocationsRequestVisitPage);
