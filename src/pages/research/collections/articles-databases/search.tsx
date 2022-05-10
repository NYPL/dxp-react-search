import React from "react";
// Apollo
import { withApollo } from "../../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import SearchResults from "../../../../components/online-resources/SearchResults";
// Utils
import onlineResourcesContent from "./../../../../__content/onlineResources";

function OnlineResourcesSearchPage() {
  const { title, description } = onlineResourcesContent;

  return (
    <PageContainer
      metaTags={{
        title: `${title} Search`,
        description: description,
      }}
      breadcrumbs={[
        {
          text: "Search",
          url: "",
        },
      ]}
      showContentHeader={true}
      contentPrimary={<SearchResults />}
    />
  );
}

export default withApollo(withRedux(OnlineResourcesSearchPage), {
  ssr: true,
  redirects: false,
});
