import * as React from "react";
import { Box, Heading, Flex } from "@nypl/design-system-react-components";
import DonationAmountInput from "./DonationAmountInput";
import DonationLinkButton from "./DonationLinkButton";
import { getImageTransformation } from "../../shared/Image/imageUtils";
import { ImageType } from "../../shared/Image";

export interface DonationProps {
  /** The id of the donation component. */
  id: string;
  /** The heading of the donation component. */
  title: string;
  /** The description of the donation component. */
  description: string;
  /** The image of the donation component */
  image: ImageType;
  /** The base url of the donation form, to be used for the generating the url. */
  donationFormBaseUrl: string;
  /** The default amount of the donation component. */
  defaultAmount: string;
  /** The level id for the user entered other input on the blackbaud form. */
  donationOtherLevelId: string;
}

export default function Donation({
  id,
  title,
  description,
  image,
  donationFormBaseUrl,
  defaultAmount,
  donationOtherLevelId,
}: DonationProps) {
  const [donationAmount, setDonationAmount] = React.useState(defaultAmount);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const value = event.currentTarget.value;
    setDonationAmount(value);
  };

  // Convert the string value to a float. Blackbaud system requires this format of the amount value.
  // i.e, $10 -> 1000 | $400.16 -> 40016.
  const donationAmountFinal = parseFloat(donationAmount) * 100;

  const singleDonationLink = `${donationFormBaseUrl}&set.DonationLevel=${donationOtherLevelId}&set.Value=${donationAmountFinal}`;
  const recurringDonationLink = `${donationFormBaseUrl}&set.DonationLevel=${donationOtherLevelId}&set.Value=${donationAmountFinal}&set.OptionalRepeat=TRUE`;

  // Background images.
  const backgroundImageSrcSm = image.transformations
    ? getImageTransformation("2_1_960", image.transformations)
    : image.uri;

  const backgroundImageSrcMd = image.transformations
    ? getImageTransformation(
        "donation_background_focal_point_1280x464",
        image.transformations
      )
    : image.uri;

  const backgroundImageSrcXl = image.transformations
    ? getImageTransformation(
        "donation_background_focal_point_1920x464",
        image.transformations
      )
    : image.uri;

  return (
    <Box id={id} minHeight="700px">
      <Box
        backgroundImage={{
          sm: backgroundImageSrcSm,
          md: backgroundImageSrcMd,
          xl: backgroundImageSrcXl,
        }}
        backgroundSize={{ sm: "100%", md: "cover" }}
        backgroundPosition={{ md: "center" }}
        minHeight={{ sm: "196px", md: "464px" }}
      >
        <Box
          id="overlay"
          padding="l"
          maxWidth="1153px"
          margin="0 auto"
          backgroundColor="white"
          position="relative"
          top={{ sm: "190px", md: "365px", xl: "425px" }}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
          <Heading level="two" color="brand.primary">
            {title}
          </Heading>
          <Flex flexFlow={{ base: "column", lg: "row" }}>
            <Box
              as="p"
              flex={{ lg: "1 0 50%" }}
              fontWeight="500"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Box
              id="donation-form"
              flex={{ lg: "1 0 50%" }}
              bgColor="brand.primary"
              padding="s"
            >
              <Box position="relative" marginBottom="s">
                <DonationAmountInput
                  donationAmount={donationAmount}
                  onChange={handleChange}
                />
              </Box>
              <Flex gap="4">
                <DonationLinkButton href={singleDonationLink}>
                  Single Donation
                </DonationLinkButton>
                <DonationLinkButton href={recurringDonationLink}>
                  Monthly Donation
                </DonationLinkButton>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
