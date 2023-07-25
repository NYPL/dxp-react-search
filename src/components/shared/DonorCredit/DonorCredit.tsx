import * as React from "react";
import {
  Heading,
  Box,
  HorizontalRule,
  Flex,
} from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";

interface DonorCreditProps {
  id: string;
  showBorder: boolean;
  heading?: string;
  description: string;
}

export default function DonorCredit({
  id,
  showBorder,
  heading,
  description,
}: DonorCreditProps) {
  return (
    <Flex id={`donor-credit-${id}`} marginBottom="xl" flexDirection="column">
      {showBorder && <HorizontalRule marginBottom="xl" marginTop="0" />}
      {heading && <Heading level="three" text={heading} marginBottom="l" />}
      <Box
        maxW={{ lg: "850px" }}
        margin="0 auto"
        px={{ sm: "s", md: "l", lg: "0" }}
        sx={{
          "& p": {
            fontStyle: "italic",
          },
        }}
      >
        <TextFormatted html={description} />
      </Box>
    </Flex>
  );
}
