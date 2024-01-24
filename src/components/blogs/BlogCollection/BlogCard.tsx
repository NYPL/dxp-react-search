import React from "react";
// Components
import { Box, HStack, Link } from "@nypl/design-system-react-components";
import Image from "../../shared/Image";
import Heading from "../../shared/Heading";
// Types
import { BlogCardItem, BlogLocation } from "./BlogCardTypes";

interface BlogCardProps {
  item: BlogCardItem;
}

function BlogCard({ item }: BlogCardProps) {
  const { id, title, description, slug, byline, date, locations, image } = item;
  return (
    <Box id={id} display={{ lg: "flex" }}>
      <Box
        flex={{ lg: "0 0 360px" }}
        mr={{ lg: "m" }}
        mb={{ base: "s", lg: 0 }}
      >
        <Image
          id={image.id}
          alt={image.alt}
          uri={image.uri}
          useTransformation={true}
          transformations={image.transformations}
          transformationLabel={"2_1_960"}
          layout="responsive"
          width={900}
          height={450}
          quality={90}
        />
      </Box>
      <Box flexFlow={{ lg: "row nowrap" }}>
        <Heading level="h3">{slug && <Link href={slug}>{title}</Link>}</Heading>
        <Box pb={5}>
          <Box>
            By {byline} | {date}
          </Box>
          {locations && (
            <HStack wrap="wrap" spacing="0" align="left">
              {locations.map((location: BlogLocation) => {
                return (
                  <Box key={location.slug} pr="xs">
                    <Link href={location.slug}>{location.name}</Link>
                  </Box>
                );
              })}
            </HStack>
          )}
        </Box>
        <Box
          sx={{
            "& p": {
              marginBottom: "0",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Box>
    </Box>
  );
}

export default BlogCard;
