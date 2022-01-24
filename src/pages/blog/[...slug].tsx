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
import useDecoupledRouter from "./../../hooks/useDecoupledRouter";

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
  const { isPreview, uuid } = useDecoupledRouter(router);

  const { loading, error, data } = useQuery(BLOG_POST_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
      }),
    },
  });

  // If uuid returns null from useDecoupledRouter, there was no router
  // path match in Drupal, so we return 404 status error component.
  if (!data && uuid === null) {
    return (
      <PageContainer
        showContentHeader={false}
        contentPrimary={<ErrorPage statusCode={404} />}
      />
    );
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
