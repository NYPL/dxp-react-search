import * as React from "react";
import {
  Box,
  Card as DsCard,
  CardHeading,
  CardContent,
  // Heading,
  // Flex,
} from "@nypl/design-system-react-components";
import { default as SharedJumbotron } from "./../Jumbotron";
import Image, { ImageType } from "../../shared/Image";

export interface JumbotronProps {
  /** The id of the jumbotron component. */
  id: string;
  /** The heading of the jumbotron component. */
  title: string;
  /** The description of the jumbotron component. */
  description: string;
  /** The image of the jumbotron component. */
  image: ImageType;
  /** The optional secondary image of the jumbotron component. */
  secondaryImage?: ImageType;
}

export default function Jumbotron({
  id,
  title,
  description,
  image,
  secondaryImage,
}: JumbotronProps) {
  return (
    <SharedJumbotron
      id={id}
      image={image}
      overlay={
        <DsCard
          id={id}
          layout="row"
          {...(secondaryImage && {
            imageProps: {
              component: (
                <Image
                  id={secondaryImage.id}
                  alt={secondaryImage.alt}
                  uri={secondaryImage.uri}
                  useTransformation={true}
                  transformations={secondaryImage.transformations}
                  transformationLabel={"2_1_960"}
                  layout="responsive"
                  width={900}
                  height={450}
                  quality={90}
                />
              ),
              size: "large",
              // Positions the image to the right of the text.
              isAtEnd: true,
            },
          })}
        >
          <CardHeading level="two" color="brand.primary">
            {title}
          </CardHeading>
          <CardContent>
            {description && (
              <Box
                as="p"
                fontWeight="500"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></Box>
            )}
          </CardContent>
        </DsCard>

        // <Flex flexFlow={{ base: "column", lg: "row" }}>
        //   <Box flex={{ lg: "1 0 50%" }} paddingRight={{ md: "s" }}>
        //     <Heading level="two" color="brand.primary">
        //       {title}
        //     </Heading>
        //     <Box
        //       as="p"
        //       fontWeight="500"
        //       dangerouslySetInnerHTML={{ __html: description }}
        //     />
        //     {secondaryImage && (
        //       <Image
        //         id={secondaryImage.id}
        //         alt={secondaryImage.alt}
        //         uri={secondaryImage.uri}
        //         useTransformation={true}
        //         transformations={secondaryImage.transformations}
        //         transformationLabel={"2_1_960"}
        //         layout="responsive"
        //         width={900}
        //         height={450}
        //         quality={90}
        //       />
        //     )}
        //   </Box>
        // </Flex>
      }
    />
  );
}
