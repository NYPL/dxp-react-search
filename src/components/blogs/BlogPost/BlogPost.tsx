import React from "react";
import Components from "./../../shared/ContentComponents/getReactComponent";
import {
  Box,
  Heading,
  HeadingLevels,
  Link,
  HStack,
} from "@nypl/design-system-react-components";

type ContentComponentObject = { [key: string]: any };

interface BlogPostProps {
  blog: any;
}

function BlogPost({ blog }: BlogPostProps) {
  return (
    <Box as="article" w="100%" maxW="866px">
      <Box as="header" pb={10}>
        <Heading id={blog.id} level={HeadingLevels.One} text={blog.title} />
        <Box fontSize="1" fontWeight="regular">
          By {blog.byline}
        </Box>
        <Box mb="xs">{blog.date}</Box>
        {blog.locations && (
          <HStack>
            {blog.locations.map((location: any) => {
              return <Link href={location.slug}>{location.name}</Link>;
            })}
          </HStack>
        )}
      </Box>
      {blog.mainContent &&
        blog.mainContent.map((contentComponent: ContentComponentObject) =>
          Components(contentComponent)
        )}
    </Box>
  );
}

export default BlogPost;
