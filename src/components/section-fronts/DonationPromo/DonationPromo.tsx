import * as React from "react";
import {
  Box,
  Heading,
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

  return (
    <Box id={id} minHeight="700px">
      <Box
        backgroundImage="/donation-promo.jpg"
        //backgroundSize="cover"
        minHeight="464px"
      >
        <Box
          id="overlay"
          padding="l"
          maxWidth="1153px"
          margin="0 auto"
          backgroundColor="white"
          position="relative"
          top="365px"
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
              <Box position="relative" marginBottom="s">
                <Box
                  as="span"
                  position="absolute"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex="10000"
                  color="brand.primary"
                  fontSize="4"
                  fontWeight="500"
                  paddingLeft="s"
                >
                  $
                </Box>
                <TextInput
                  id="donation-ways"
                  type="text"
                  labelText="Ways to donate"
                  showLabel={false}
                  value={donationAmount}
                  onChange={handleChange}
                  sx={{
                    "& input": {
                      fontSize: "4",
                      paddingX: "xl",
                      paddingY: "l",
                    },
                  }}
                />
                <Box
                  as="span"
                  position="absolute"
                  top="50%"
                  transform="translateY(-50%)"
                  right="0"
                  zIndex="10000"
                  color="brand.primary"
                  fontSize="4"
                  fontWeight="500"
                  paddingRight="s"
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
                    _hover: {
                      backgroundColor: "ui.gray.light-cool",
                      color: "var(--nypl-colors-brand-primary)",
                    },
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
                    _hover: {
                      backgroundColor: "ui.gray.light-cool",
                      color: "var(--nypl-colors-brand-primary)",
                    },
                  }}
                >
                  Monthly Donation
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

// interface TextInputAffix {
//   text: string;
//   mode: "prefix" | "postfix";
// }

// function TextInputAffix( { text, mode }) {
//   return (
//     <Box
//       as="span"
//       position="absolute"
//       top="50%"
//       transform="translateY(-50%)"
//       right="0"
//       zIndex="2"
//       color="brand.primary"
//       fontSize="4"
//       fontWeight="500"
//       paddingRight="s"
//     >
//       {text}
//     </Box>
//   );
// }
