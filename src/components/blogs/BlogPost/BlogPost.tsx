import React from "react";
import Components from "./../../shared/ContentComponents/getReactComponent";

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

interface BlogPostProps {
  blog: any;
}

function BlogPost({ blog }: BlogPostProps) {
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
