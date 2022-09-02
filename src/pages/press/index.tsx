import React from "react";
import { GetStaticProps } from "next";
// Apollo
import withApollo from "./../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
// Components
import PageContainer from "../../components/press-releases/layouts/PageContainer";
import PressReleaseCollection, {
  ALL_PRESS_RELEASES_QUERY,
} from "../../components/press-releases/PressReleaseCollection";
// Content
import pressContent from "../../__content/press";

function PressMainPage() {
  const { meta, mediaContacts } = pressContent;
  return (
    <PageContainer
      metaTags={{
        title: meta.title,
        description: meta.description,
      }}
      showContentHeader={true}
      contentPrimary={
        <>
          <PressReleaseCollection
            id="press-releases"
            description={meta.description}
            mediaContacts={mediaContacts.bodyText}
            limit={10}
            sort={{ field: "created", direction: "DESC" }}
            status={true}
          />
        </>
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
    // 10 mins.
    revalidate: 600,
  };
};

export default withApollo(PressMainPage);
