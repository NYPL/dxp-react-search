import React from "react";
// Next
import { useRouter } from "next/router";
import ErrorPage from "next/error";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../apollo/client/withApollo";
import { BLOG_FIELDS_FRAGMENT } from "./../../apollo/client/fragments/blogFields";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import BlogPost from "../../components/blogs/BlogPost";
// Hooks
import useDecoupledRouterQuery from "./../../hooks/useDecoupledRouterQuery";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

const BLOG_POST_QUERY = gql`
  ${BLOG_FIELDS_FRAGMENT}
  query BlogPostQuery($id: String, $preview: Boolean) {
    blog(id: $id, preview: $preview) {
      ...BlogFields
    }
  }
`;

function BlogPostPage() {
  const router = useRouter();
  let uuid = useDecoupledRouterQuery(router.asPath);
  // Preview mode.
  const isPreview =
    router.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    router.query.uuid
      ? true
      : false;
  // Set the uuid for preview mode.
  if (isPreview) {
    uuid = router.query.uuid;
  }

  // If uuid returns null from useDecoupledRouterQuery, there was no router
  // path match in Drupal, so we return 404 status error component.
  if (!uuid) {
    return (
      <PageContainer
        showContentHeader={false}
        contentPrimary={<ErrorPage statusCode={404} />}
      />
    );
  }

  const { loading, error, data } = useQuery(BLOG_POST_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
      }),
    },
  });

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state,
  if (loading) {
    return (
      <PageContainer
        showContentHeader={false}
        contentPrimary={<div>Loading...</div>}
      />
    );
  }

  return (
    <PageContainer
      showContentHeader={false}
      contentPrimary={<BlogPost blog={data.blog} />}
    />
  );
}

export default withApollo(BlogPostPage, {
  ssr: true,
  redirects: true,
});
