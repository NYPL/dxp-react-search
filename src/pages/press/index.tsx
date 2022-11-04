import React from "react";
// import { GetServerSidePropsContext } from "next";
// Apollo
import withApollo from "./../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
// Components
import { Heading, Box } from "@nypl/design-system-react-components";
import PageContainer from "../../components/press-releases/layouts/PageContainer";
import PressReleaseCollection, {
  ALL_PRESS_RELEASES_QUERY,
} from "../../components/press-releases/PressReleaseCollection";
// Content
import pressContent from "../../__content/press";

function PressMainPage() {
  const { meta, mediaInquiries } = pressContent;

  return (
    <PageContainer
      metaTags={{
        title: meta.title,
        description: meta.description,
      }}
      showContentHeader={true}
      contentPrimary={
        <>
          <Heading level="two">{mediaInquiries.heading}</Heading>
          <Box
            marginBottom="s"
            sx={{
              "& a": {
                color: "var(--nypl-colors-ui-black)",
                textDecor: "underline",
              },
            }}
            dangerouslySetInnerHTML={{ __html: mediaInquiries.description }}
          />

          <PressReleaseCollection
            id="press-releases"
            limit={10}
            sort={{ field: "created", direction: "DESC" }}
            status={true}
          />
        </>
      }
    />
  );
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRESS_RELEASES_QUERY,
    variables: {
      limit: 10,
      pageNumber: 1,
      sort: { field: "created", direction: "DESC" },
      filter: { status: { fieldName: "status", operator: "=", value: true } },
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default withApollo(PressMainPage);
