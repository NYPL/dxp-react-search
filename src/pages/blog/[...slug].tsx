import * as React from "react";
// Next
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
// Adobe
import trackAdobeVirtualPageView from "../../utils/track-adobe-virtual-page-view";

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

  // Adobe Analytics: trigger an initial virtual page view on initial render.
  React.useEffect(() => {
    console.log("blog slug initial render");
    console.log(data);

    trackAdobeVirtualPageView({
      path: router.asPath,
      bundle: "blog",
      ...(data?.blog.locations && {
        customParams: {
          location: data.blog.locations[0].locationCode,
        },
      }),
    });
  }, []);

  // When next js routes change, send data to GA4 and Adobe Analytics.
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log("blog slug handleRouteChange");
      console.log(url);
      console.log(data);

      trackAdobeVirtualPageView({
        path: router.asPath,
        bundle: "blog",
        ...(data?.blog.locations && {
          customParams: {
            location: data.blog.locations[0].locationCode,
          },
        }),
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, data]);

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
  async (_context, props: WithDrupalRouterReturnProps) => {
    const { apolloClient, uuid, bundle, isPreview, revisionId } = props;

    await apolloClient.query({
      query: BLOG_POST_QUERY,
      variables: {
        id: uuid,
        ...(isPreview && {
          preview: true,
          revisionId: revisionId,
        }),
      },
    });

    return {
      props: {
        bundle: bundle,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  },
  { customPreview: true }
);

export default withApollo(BlogPostPage);
