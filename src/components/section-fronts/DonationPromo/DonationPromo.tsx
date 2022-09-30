import * as React from "react";
import {
  Box,
  Heading,
  //HStack,
  Flex,
  Link,
  Text,
  TextInput,
} from "@nypl/design-system-react-components";

export interface DonationProps {
  /** The id of the donation component. */
  id: string;
  /** The heading of the donation component. */
  heading: string;
  /** The description of the donation component. */
  description: string;
  /** The default amount of the donation component. */
  defaultAmount: string;
  /** The base url of the donation form, to be used for the generating the url. */
  donationFormBaseUrl: string;
  /** The level id for the user entered other input on the blackbaud form. */
  donationOtherLevelId: string;
}

export default function DonationPromo({
  id,
  heading,
  description,
  defaultAmount,
  donationFormBaseUrl,
  donationOtherLevelId,
}: DonationProps) {
  const [donationAmount, setDonationAmount] = React.useState(defaultAmount);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const value = event.currentTarget.value;
    setDonationAmount(value);
  };

  // Convert the string value to a float. Blackbaud system requires this format of the amount value.
  // i.e, $10 -> 1000 | $400.16 -> 40016.
  const donationAmountFinal = parseFloat(donationAmount) * 100;

  const singleDonationLink = `${donationFormBaseUrl}&set.DonationLevel=${donationOtherLevelId}&set.Value=${donationAmountFinal}`;
  const recurringDonationLink = `${donationFormBaseUrl}&set.DonationLevel=${donationOtherLevelId}&set.Value=${donationAmountFinal}&set.OptionalRepeat=TRUE`;

  return (
    <Box id={id}>
      <Box
        id="overlay"
        padding="l"
        maxWidth="1153px"
        margin="0 auto"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Heading level="two" color="brand.primary">
          {heading}
        </Heading>
        <Flex>
          <Text flex="1 0 50%" fontWeight="500">
            {description}
          </Text>
          <Box
            id="donation-form"
            bgColor="brand.primary"
            padding="s"
            flex="1 0 50%"
          >
            <Box position="relative" paddingBottom="s">
              <Box
                as="span"
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                zIndex="2"
                color="brand.primary"
                fontWeight="bold"
                paddingLeft="xxs"
              >
                $
              </Box>
              <TextInput
                id="donation-ways"
                type="text"
                labelText="Ways to donate"
                showLabel={false}
                defaultValue="100"
                placeholder="$100 USD"
                value={donationAmount}
                onChange={handleChange}
              />
              <Box
                as="span"
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                right="0"
                zIndex="2"
                color="brand.primary"
                fontWeight="bold"
                paddingRight="xxs"
              >
                USD
              </Box>
            </Box>
            <Flex gap="4">
              <Link
                type="button"
                href={singleDonationLink}
                sx={{
                  width: "100%",
                  color: "var(--nypl-colors-brand-primary)",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
              >
                Single Donation
              </Link>
              <Link
                type="button"
                href={recurringDonationLink}
                sx={{
                  width: "100%",
                  color: "var(--nypl-colors-brand-primary)",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
              >
                Monthly Donation
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
