import React from "react";
import { GetServerSidePropsContext } from "next";
// Apollo
import withApollo from "./../../../../apollo/withApollo";
import { initializeApollo } from "./../../../../apollo/withApollo/apollo";
import { ONLINE_RESOURCE_BY_ID_QUERY } from "./[slug]";
// Components
import PageContainer from "../../../../components/online-resources/layouts/PageContainer";
import VerifyForm from "../../../../components/online-resources/VerifyForm";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../../utils/config";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function OnlineResourcesVerifyPage() {
  const pageTitle = "Log in to use this database";

  return (
    <PageContainer
      metaTags={{
        title: pageTitle,
        description: "Enter library card number to access database",
      }}
      breadcrumbs={[
        {
          text: pageTitle,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
        },
      ]}
      showContentHeader={false}
      contentPrimary={<VerifyForm />}
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const uuid = context.query.uuid;

  if (!uuid) {
    return {
      notFound: true,
    };
  }

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ONLINE_RESOURCE_BY_ID_QUERY,
    variables: {
      id: uuid,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default withApollo(OnlineResourcesVerifyPage);
