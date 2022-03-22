import React from "react";
// Next
import { useRouter } from "next/router";
import Error from "../_error";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../apollo/client/withApollo";
import { PRESS_FIELDS_FRAGMENT } from "./../../apollo/client/fragments/pressFields";
// Components
import { SkeletonLoader } from "@nypl/design-system-react-components";
import PageContainer from "../../components/press-releases/layouts/PageContainer";
import PressRelease from "../../components/press-releases/PressRelease";
// Hooks
import useDecoupledRouter from "./../../hooks/useDecoupledRouter";

const PRESS_RELEASE_QUERY = gql`
  ${PRESS_FIELDS_FRAGMENT}
  query PressReleaseQuery($id: String, $revisionId: String, $preview: Boolean) {
    pressRelease(id: $id, revisionId: $revisionId, preview: $preview) {
      ...PressFields
    }
  }
`;

function PressReleasePage() {
  const router = useRouter();
  const { isPreview, uuid } = useDecoupledRouter(router);

  const { loading, error, data } = useQuery(PRESS_RELEASE_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
        revisionId: router.query.revision_id,
      }),
    },
  });
  // If uuid returns null from useDecoupledRouter, there was no router
  // path match in Drupal, so we return 404 status error component.
  if (!data && uuid === null) {
    return <Error statusCode={404} />;
  }

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return (
      <PageContainer
        showContentHeader={false}
        contentPrimary={<SkeletonLoader contentSize={5} showImage={false} />}
      />
    );
  }

  return (
    <PageContainer
      metaTags={{
        title: data.pressRelease.title,
        description: data.pressRelease.description,
        imageUrl: data.pressRelease.image.uri,
      }}
      breadcrumbs={[
        {
          text: data.pressRelease.title,
        },
      ]}
      showContentHeader={false}
      contentPrimary={<PressRelease pressRelease={data.pressRelease} />}
    />
  );
}

export default withApollo(PressReleasePage, {
  ssr: true,
  redirects: true,
});
