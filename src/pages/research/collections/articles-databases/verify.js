import React from "react";
// Apollo
import { withApollo } from "../../../../apollo/client/withApollo";
// Redux
import { withRedux } from "../../../../redux/withRedux";
// Components
import PageContainer from "../../../../components/online-resources/layouts/PageContainer";
import VerifyForm from "../../../../components/online-resources/VerifyForm";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../../utils/config";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function OnlineResourcesVerifyPage() {
  return (
    <PageContainer
      metaTags={{
        title: "Log in to use this database",
        description: "Enter library card number to access database",
      }}
      breadcrumbs={[
        {
          text: "Login to use this database",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
        },
      ]}
      showContentHeader={false}
      contentPrimary={<VerifyForm />}
    />
  );
}

export default withApollo(withRedux(OnlineResourcesVerifyPage), {
  ssr: true,
  redirects: false,
});
