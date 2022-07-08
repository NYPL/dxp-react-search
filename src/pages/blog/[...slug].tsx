import React from "react";
// Next
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Error from "./../_error";
// Apollo
import { gql, useQuery } from "@apollo/client";
import withApollo from "./../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
import { BLOG_FIELDS_FRAGMENT } from "./../../apollo/client/fragments/blogFields";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import BlogPost from "../../components/blogs/BlogPost";
import BlogPostSkeletonLoader from "./../../components/blogs/BlogPost/BlogPostSkeletonLoader";
// Hooks
import useDecoupledRouter, {
  DECOUPLED_ROUTER_QUERY,
} from "./../../hooks/useDecoupledRouter";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  let uuid;

  // Preview mode.
  const isPreview =
    context.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    context.query.uuid
      ? true
      : false;
  // Set the uuid for preview mode.
  if (isPreview) {
    uuid = context.query.uuid;
  } else {
    // Get the slug from the context, i.e., "/blog/whatever-title".
    const slug = context.resolvedUrl;
    // Get decoupled router data.
    const decoupledRouterData = await apolloClient.query({
      query: DECOUPLED_ROUTER_QUERY,
      variables: {
        path: slug,
      },
    });

    uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
    const redirect = await decoupledRouterData?.data?.decoupledRouter?.redirect;

    // Redirect logic.
    // Route is not found in CMS, so set 404 status.
    if (uuid === null && !redirect) {
      return {
        notFound: true,
      };
    }

    // Handle the redirect.
    if (redirect) {
      return {
        redirect: {
          // Will return 308 status, not 301.
          // @see https://stackoverflow.com/a/42138726
          permanent: true,
          destination: redirect.to,
        },
        props: {},
      };
    }
  }

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

export default withApollo(BlogPostPage);
