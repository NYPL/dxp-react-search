import React from "react";
import Components, {
  ContentComponentObject,
} from "./../../shared/ContentComponents/getReactComponent";
import {
  Box,
  Heading,
  Link,
  HStack,
} from "@nypl/design-system-react-components";

interface BlogPostProps {
  blog: any;
}

function BlogPost({ blog }: BlogPostProps) {
  return (
    <Box as="article" w="100%" maxW="866px">
      <Box as="header" pb={10}>
        <Heading id={blog.id} level="one" text={blog.title} />
        <Box fontSize="1" fontWeight="regular">
          By {blog.byline}
        </Box>
        <Box mb="xs">{blog.date}</Box>
        {blog.locations && (
          <HStack wrap="wrap" spacing="0" align="left">
            {blog.locations.map((location: any) => {
              return (
                <Box pr="xs">
                  <Link key={location.slug} href={location.slug}>
                    {location.name}
                  </Link>
                </Box>
              );
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
