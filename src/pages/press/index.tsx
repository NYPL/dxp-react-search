import React from "react";
// Apollo
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/press-releases/layouts/PageContainer";
import PressReleasesContainer from "../../components/press-releases/PressReleasesContainer";
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
          <PressReleasesContainer
            id="press-releases"
            // title={featured_posts.heading}
            description={meta.description}
            // slug={featured_posts.slug}
            // slugLabel={featured_posts.slugLabel}
            limit={10}
            sort={{ field: "created", direction: "DESC" }}
            // status={true}
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
