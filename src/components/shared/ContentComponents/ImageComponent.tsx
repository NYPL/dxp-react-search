import React from "react";
import { Box } from "@nypl/design-system-react-components";
import Image from "../../shared/Image";

interface ImageComponentProps {
  id: string;
  type: string;
  image: any;
  caption?: string;
  credit?: string;
  link?: string;
}

interface WithLinkProps {
  link?: string;
  children: React.ReactNode;
}

// Wrapper function to add a Link parent component.
function WithLink({ link, children }: WithLinkProps) {
  if (link) {
    return <a href={link}>{children}</a>;
  }
  return <>{children}</>;
}

function ImageComponent({
  id,
  type,
  image,
  caption,
  credit,
  link,
}: ImageComponentProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      <WithLink link={link}>
        <Image
          id={image.id}
          alt={image.alt}
          uri={image.uri}
          useTransformation={true}
          transformations={image.transformations}
          transformationLabel={"max_width_960"}
          width={image.width}
          height={image.height}
          layout="responsive"
          quality={90}
        />
        {caption && (
          <Box fontSize="-1" fontWeight="regular">
            {caption}
          </Box>
        )}
        {credit && (
          <Box fontSize="-3" fontStyle="italic">
            {credit}
          </Box>
        )}
      </WithLink>
    </Box>
  );
}

export default ImageComponent;
