import React from "react";
import Components from "./../../shared/ContentComponents/getReactComponent";
import {
  Box,
  Heading,
  HeadingLevels,
  Link,
  HStack,
} from "@nypl/design-system-react-components";
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
    <Box as="article" w="100%" maxW="866px">
      <Box as="header" pb={10}>
        <Heading id={blog.id} level={HeadingLevels.One} text={blog.title} />
        <Box>By {blog.byline}</Box>
        <Box>{blog.date}</Box>
        <HStack>
          {blog.locations.map((location: any) => {
            return <Link href={location.slug}>{location.name}</Link>;
          })}
        </HStack>
      </Box>
      {blog.mainContent.map((contentComponent: ContentComponentObject) =>
        Components(contentComponent)
      )}
    </Box>
  );
}

export default BlogPost;
