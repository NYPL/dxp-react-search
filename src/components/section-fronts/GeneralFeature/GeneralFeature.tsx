import * as React from "react";
import {
  Box,
  Heading,
  Flex,
  Image,
} from "@nypl/design-system-react-components";
import Jumbotron from "../Jumbotron";
import { ImageType } from "../../shared/Image";

export interface GeneralFeatureProps {
  /** The id of the GeneralFeature component. */
  id: string;
  /** The heading of the GeneralFeature component. */
  title: string;
  /** The description of the GeneralFeature component. */
  description: string;
  /** The image of the GeneralFeature component */
  image: ImageType;
  jumbotronImg: string;
}

export default function GeneralFeature({
  id,
  title,
  description,
  image,
  jumbotronImg,
}: GeneralFeatureProps) {
  return (
    <Jumbotron
      id={id}
      image={image}
      overlay={
        <Flex flexFlow={{ base: "column", lg: "row" }}>
          <Box flex={{ lg: "1 0 70%" }} paddingRight={{ md: "s" }}>
            <Heading level="two" color="brand.primary">
              {title}
            </Heading>
            <Box
              as="p"
              fontWeight="500"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Box>
          <Box id="donation-form" flex={{ lg: "1 0 30%" }} padding="s">
            <Image src={jumbotronImg} alt="" />
          </Box>
        </Flex>
      }
    />
  );
}
