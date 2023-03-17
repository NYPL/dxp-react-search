import * as React from "react";
import { Box } from "@nypl/design-system-react-components";
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
    <Box id={id} marginBottom="l">
      <Box
        backgroundImage={{
          sm: "none",
          //@TODO Should there be a transition for tablet?
          md: backgroundImageSrcLg,
          "2xl": backgroundImageSrc2Xl,
        }}
        backgroundSize={{ sm: "100%", md: "cover" }}
        backgroundPosition={{ md: "center" }}
        minHeight={{ md: "305px", lg: "464px" }}
        marginBottom={{ sm: "s", md: "initial" }}
      >
        <Box display={{ md: "none" }}>
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
      </Box>
      <Box
        id="jumbotron-overlay"
        backgroundColor="white"
        maxWidth="1240px"
        margin="0 auto"
        padding={{ sm: "s", md: "xl" }}
        marginTop={{ md: "-40px" }}
        boxShadow={{ md: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        borderWidth={{ sm: "1px", md: "none" }}
        borderColor="ui.gray.medium"
        mx={{ sm: "s", xl: "auto" }}
      >
        {overlay}
      </Box>
    </Box>
  );
}
