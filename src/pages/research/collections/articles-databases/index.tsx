import React from "react";
// Apollo
import { withApollo } from "./../../../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import AlphabetNav from "./../../../../components/online-resources/AlphabetNav";
import ResourceTopics from "./../../../../components/online-resources/ResourceTopics";
import MostPopularResources from "./../../../../components/online-resources/MostPopularResources";
// Utils
import onlineResourcesContent from "./../../../../__content/onlineResources";

function OnlineResources() {
  const { title, description } = onlineResourcesContent;

  return (
    <PageContainer
      metaTags={{
        title: title,
        description: description,
      }}
      showContentHeader={true}
      contentPrimary={
        <>
          <ResourceTopics
            id="featured-resources"
            title="Featured Resources"
            limit={30}
            // @ts-ignore
            sort={{ field: "weight", direction: "ASC" }}
          />
          <MostPopularResources id="most-popular" title="Most Popular" />
          <AlphabetNav
            title={"A-Z Articles & Databases"}
            description={
              "Browse resources and databases alphabetically by name"
            }
            className="online-resource-main-alpha-nav"
          />
        </>
      }
    />
  );
}

export default withApollo(withRedux(OnlineResources), {
  ssr: true,
  redirects: false,
});
