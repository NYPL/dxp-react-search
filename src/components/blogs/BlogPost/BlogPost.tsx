import * as React from "react";
// Drupal paragraphs.
import DrupalParagraphs from "../../shared/DrupalParagraphs";
import AudioEmbed from "../../shared/ContentComponents/AudioEmbed";
import BlogCardGrid from "./BlogCardGrid";
import GoogleMapEmbed from "../../shared/ContentComponents/GoogleMapEmbed";
import ImageComponent from "../../shared/ContentComponents/ImageComponent";
import SocialEmbed from "../../shared/ContentComponents/SocialEmbed";
import Text from "../../shared/ContentComponents/Text";
import TextWithImage from "../../shared/ContentComponents/TextWithImage";
import Video from "../../shared/ContentComponents/Video";
//
import { Box, Link, HStack } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";

interface BlogPostProps {
  blog: any;
}

export default function BlogPost({ blog }: BlogPostProps) {
  return (
    <Box as="article" w="100%" maxW="866px">
      <Box as="header" pb={10}>
        <Heading id={blog.id} level="h1" size="heading2">
          {blog.title}
        </Heading>
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
          TextWithImage: TextWithImage,
          Video: Video,
        }}
      />
    </Box>
  );
}
