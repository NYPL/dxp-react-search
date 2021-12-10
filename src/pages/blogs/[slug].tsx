import React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import BlogPost from "../../components/blogs/BlogPost";
// Hooks
import useDecoupledRouterQuery from "./../../hooks/useDecoupledRouterQuery";

const BLOG_POST_QUERY = gql`
  query BlogPostQuery($id: String) {
    blog(id: $id) {
      id
      title
      description
      byline
      date
      locations {
        id
        name
        slug
      }
      mainContent {
        __typename
        ... on Slideshow {
          id
          type
          heading
        }
        ... on TextWithImage {
          id
          type
          heading
          text
          image {
            id
            alt
            uri
            transformations {
              id
              label
              uri
            }
          }
        }
        ... on Video {
          id
          type
          heading
          video
        }
        ... on Text {
          id
          type
          heading
          text
        }
        ... on SocialEmbed {
          id
          type
          embedCode
        }
        ... on AudioEmbed {
          id
          type
          embedCode
        }
      }
    }
  }
`;

function BlogPostPage() {
  const router = useRouter();
  const uuid = useDecoupledRouterQuery(router.asPath);

  const { loading, error, data } = useQuery(BLOG_POST_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
    },
  });

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
