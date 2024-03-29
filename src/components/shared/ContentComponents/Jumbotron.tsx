import * as React from "react";
import {
  Box,
  Card as DsCard,
  CardContent,
  Link,
} from "@nypl/design-system-react-components";
import Heading from "../Heading";
import { default as SharedJumbotron } from "./../Jumbotron";
import TextFormatted from "../TextFormatted";
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
  /** The link of the jumbotron component. */
  link: { title: string; url: string; uri: string };
}

export default function Jumbotron({
  id,
  title,
  description,
  image,
  secondaryImage,
  link,
}: JumbotronProps) {
  return (
    <SharedJumbotron
      id={id}
      image={image}
      overlay={
        <>
          <Heading
            level="h2"
            color="brand.primary"
            mb={{ base: `${secondaryImage ? "-xs" : "s"}`, md: "s" }}
          >
            {title}
          </Heading>
          <DsCard
            id={id}
            layout="row"
            isCentered
            flexDirection={{ base: "column-reverse", md: "unset" }}
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
            <CardContent>
              {description && (
                <>
                  <Box mt={{ base: "s", md: "unset" }} mb="l">
                    <TextFormatted html={description} />
                  </Box>
                  <Link
                    id="nypl-link"
                    href={link.url}
                    // @TODO this will have to be updated to "buttonPrimary" after upgrading to DS 1.4.x.
                    type="button"
                    width="fit-content"
                  >
                    {link.title}
                  </Link>
                </>
              )}
            </CardContent>
          </DsCard>
        </>
      }
    />
  );
}
