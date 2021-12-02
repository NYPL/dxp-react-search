import React from "react";
// Next
import Router, { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import Components from "./../../shared/ContentComponents/getReactComponent";

const BLOG_POST_QUERY = gql`
  query BlogPostQuery($slug: String) {
    blog(slug: $slug) {
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
        ... on Slideshow {
          id
          type
          heading
        }
      }
    }
  }
`;

/*
@TODO
contentComponent will be an object from gql data, like this, but different
for every content component.

{
  __typename: 'Video',
  heading: 'Test Video',
  id: '90d64e6a-baed-4f58-8fdb-a33534be259a',
  type: 'video',
  video: 'https://www.youtube.com/watch?v=Auta2lagtw4'
}
*/

type ContentComponentObject = { [key: string]: any };

function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(BLOG_POST_QUERY, {
    variables: {
      slug: `/blogs/${slug}`,
    },
  });

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading</div>;
  }

  const blog = data.blog;

  return (
    <article>
      <header>
        <h1>{blog.title}</h1>
        <div>By {blog.byline}</div>
        <div>{blog.date}</div>
        <div>
          {blog.locations.map((location: any) => {
            return (
              <a style={{ paddingRight: "5px" }} href={location.slug}>
                {location.name}
              </a>
            );
          })}
        </div>
      </header>

      <br />
      <br />
      <p>{blog.id}</p>
      <p>{blog.description}</p>

      <br />
      <br />

      {blog.mainContent.map((contentComponent: ContentComponentObject) =>
        Components(contentComponent)
      )}
    </article>
  );
}

export default BlogPost;
