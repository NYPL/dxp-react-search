import * as React from "react";
import { Box, Flex, Heading } from "@nypl/design-system-react-components";
import Image, { ImageType } from "../../shared/Image";
import { getImageTransformation } from "../../shared/Image/imageUtils";

interface JumbotronProps {
  id: string;
  image: ImageType;
  overlay?: React.ReactNode;
}
export default function Jumbotron({ id, image, overlay }: JumbotronProps) {
  // Background images.
  const backgroundImageSrcLg = image.transformations
    ? getImageTransformation(
        "jumbotron_background_focal_point_1280x464",
        image.transformations
      )
    : image.uri;

  const backgroundImageSrc2Xl = image.transformations
    ? getImageTransformation(
        "jumbotron_background_focal_point_1920x464",
        image.transformations
      )
    : image.uri;

  return (
    <Box id={id} minHeight={{ lg: "700px" }}>
      <Box
        backgroundImage={{
          md: "none",
          lg: backgroundImageSrcLg,
          "2xl": backgroundImageSrc2Xl,
        }}
        backgroundSize={{ sm: "100%", md: "cover" }}
        backgroundPosition={{ md: "center" }}
        minHeight={{ md: "464px" }}
        marginBottom={{ sm: "m", md: "initial" }}
      >
        <Box display={{ lg: "none" }}>
          <Image
            id={image.id}
            alt={image.alt}
            uri={image.uri}
            useTransformation={true}
            transformations={image.transformations}
            transformationLabel={"jumbotron_background_focal_point_1280x464"}
            layout="responsive"
            width={image.width}
            height={image.height}
            quality={90}
          />
        </Box>
        <Box
          id="overlay"
          padding={{ sm: "s", md: "xl" }}
          maxWidth="1240px"
          margin="0 auto"
          backgroundColor="white"
          position="relative"
          top={{ lg: "444px", xl: "425px" }}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
          {overlay ? (
            overlay
          ) : (
            <Flex
              id="jumbotron-overlay"
              flexFlow={{ base: "column", lg: "row" }}
            >
              <Box
                id="jumbotron-left4-side"
                flex={{ lg: "1 0 66%" }}
                paddingRight={{ md: "s" }}
              >
                <Heading level="two" color="brand.primary">
                  Our Mission
                </Heading>
                <Box as="p" fontWeight="500">
                  The Center for Educators and Schools uses The New York Public
                  Library's resources and collections to ignite curiosity, joy,
                  and a passion for learning within educators, students, and
                  school communities.
                </Box>
              </Box>
              <Box
                id="jumbotron-right-side"
                flex={{ lg: "1 0 33%" }}
                bgColor="brand.primary"
                padding="s"
              ></Box>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}
