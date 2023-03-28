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
  let backgroundImageSrcLg = image.uri;
  if (image.transformations) {
    const lgTransformationUri = getImageTransformation(
      "donation_background_focal_point_1280x464",
      image.transformations
    );
    if (lgTransformationUri !== null) {
      backgroundImageSrcLg = lgTransformationUri;
    }
  }

  let backgroundImageSrc2Xl = image.uri;
  if (image.transformations) {
    const xlTransformationUri = getImageTransformation(
      "donation_background_focal_point_1920x464",
      image.transformations
    );
    if (xlTransformationUri !== null) {
      backgroundImageSrc2Xl = xlTransformationUri;
    }
  }

  return (
    <Box id={id} marginBottom="l">
      <Box
        backgroundImage={{
          md: "none",
          lg: backgroundImageSrcLg,
          "2xl": backgroundImageSrc2Xl,
        }}
        backgroundSize={{ sm: "100%", md: "cover" }}
        backgroundPosition={{ md: "center" }}
        minHeight={{ lg: "464px" }}
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
      </Box>
      <Box
        id="jumbotron-overlay"
        backgroundColor="white"
        maxWidth="1240px"
        margin="0 auto"
        padding={{ sm: "s", md: "xl" }}
        marginTop={{ lg: "-40px" }}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        {overlay}
      </Box>
    </Box>
  );
}
