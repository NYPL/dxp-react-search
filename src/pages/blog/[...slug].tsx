import * as React from "react";
// Next
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Error from "./../_error";
// Apollo
import { gql, useQuery } from "@apollo/client";
import withApollo from "./../../apollo/withApollo";
import { BLOG_FIELDS_FRAGMENT } from "./../../apollo/client/fragments/blogFields";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import BlogPost from "../../components/blogs/BlogPost";
import BlogPostSkeletonLoader from "./../../components/blogs/BlogPost/BlogPostSkeletonLoader";
// Hooks
import useDecoupledRouter from "./../../hooks/useDecoupledRouter";
// HOC
import withDrupalRouter, {
  WithDrupalRouterReturnProps,
  // NextDataFetchingFunctionContext,
} from "../../apollo/with-drupal-router";

const BLOG_POST_QUERY = gql`
  ${BLOG_FIELDS_FRAGMENT}
  query BlogPostQuery($id: String, $revisionId: String, $preview: Boolean) {
    blog(id: $id, revisionId: $revisionId, preview: $preview) {
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

  // Loading state.
  if (loading || !data) {
    return (
      <PageContainer
        showContentHeader={false}
        contentPrimary={<BlogPostSkeletonLoader />}
      />
    );
  }

  return (
    <PageContainer
      metaTags={{
        title: data.blog.title,
        description: data.blog.description,
        imageUrl: data.blog.image.uri,
      }}
      breadcrumbs={[
        {
          text: data.blog.title,
          url: "",
        },
      ]}
      showContentHeader={false}
      contentPrimary={<BlogPost blog={data.blog} />}
    />
  );
}

export const getServerSideProps = withDrupalRouter(
  // @ts-ignore
  async (
    context: GetServerSidePropsContext,
    props: WithDrupalRouterReturnProps
  ) => {
    const { uuid, isPreview, apolloClient } = props;

    await apolloClient.query({
      query: BLOG_POST_QUERY,
      variables: {
        id: uuid,
        ...(isPreview && {
          preview: true,
          revisionId: context.query.revision_id,
        }),
      },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
);

export default withApollo(BlogPostPage);
