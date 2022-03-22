import React from "react";
// Apollo
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/press-releases/layouts/PageContainer";
import PressReleaseCollection from "../../components/press-releases/PressReleaseCollection";
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
          />
        </>
      }
    />
  );
}

export default withApollo(PressMainPage, {
  ssr: true,
  redirects: false,
});
