import * as React from "react";
import { Box, Flex } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
import DonationAmountInput from "./DonationAmountInput";
import DonationLinkButton from "./DonationLinkButton";
import Jumbotron from "./../../shared/Jumbotron";
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
  formBaseUrl: string;
  /** The default amount of the donation component. */
  defaultAmount: string;
  /** The level id for the user entered other input on the blackbaud form. */
  otherLevelId: string;
}

export default function Donation({
  id,
  title,
  description,
  image,
  // I did remove the donation -prefix to enabe in to work through the getReactComponent
  formBaseUrl,
  defaultAmount,
  otherLevelId,
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

  const singleDonationLink = `${formBaseUrl}&set.DonationLevel=${otherLevelId}&set.Value=${donationAmountFinal}`;
  const recurringDonationLink = `${formBaseUrl}&set.DonationLevel=${otherLevelId}&set.Value=${donationAmountFinal}&set.OptionalRepeat=TRUE`;

  return (
    <Jumbotron
      id={id}
      image={image}
      overlay={
        <Flex flexFlow={{ base: "column", md: "row" }}>
          <Box
            flex={{ md: "1 0 50%" }}
            paddingRight={{ md: "s" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading level="h2" color="brand.primary">
              {title}
            </Heading>
            <Box as="span" dangerouslySetInnerHTML={{ __html: description }} />
          </Box>
          <Box
            id="donation-form"
            flex={{ md: "1 0 50%" }}
            bgColor="brand.primary"
            padding="s"
            margin="auto"
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
      }
    />
  );
}
