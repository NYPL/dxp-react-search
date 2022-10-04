import * as React from "react";
import { Box, TextInput } from "@nypl/design-system-react-components";

export interface DonationAmountInputProps {
  donationAmount: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export default function DonationAmountInput({
  donationAmount,
  onChange,
}: DonationAmountInputProps) {
  return (
    <>
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
        onChange={onChange}
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
    </>
  );
}
