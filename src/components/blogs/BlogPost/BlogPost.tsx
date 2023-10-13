import * as React from "react";
// Drupal paragraphs.
import DrupalParagraphs from "../../shared/DrupalParagraphs";
import AudioEmbed from "../../shared/ContentComponents/AudioEmbed";
import BlogCardGrid from "./BlogCardGrid";
import GoogleMapEmbed from "../../shared/ContentComponents/GoogleMapEmbed";
import ImageComponent from "../../shared/ContentComponents/ImageComponent";
import SocialEmbed from "../../shared/ContentComponents/SocialEmbed";
import Text from "../../shared/ContentComponents/Text";
import Video from "../../shared/ContentComponents/Video";

import {
  Box,
  Heading,
  Link,
  HStack,
} from "@nypl/design-system-react-components";

interface BlogPostProps {
  blog: any;
}

export default function BlogPost({ blog }: BlogPostProps) {
  console.log(blog);

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
                <Box pr="xs" key={location.id}>
                  <Link href={location.slug}>{location.name}</Link>
                </Box>
              );
            })}
          </HStack>
        )}
      </Box>
      <DrupalParagraphs
        content={blog.mainContent}
        components={{
          AudioEmbed: AudioEmbed,
          BlogCardGrid: BlogCardGrid,
          GoogleMapEmbed: GoogleMapEmbed,
          ImageComponent: ImageComponent,
          SocialEmbed: SocialEmbed,
          Text: Text,
          Video: Video,
        }}
      />
    </Box>
  );
}
