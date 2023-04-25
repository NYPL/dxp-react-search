import * as React from "react";
import {
  Heading,
  Box,
  HorizontalRule,
  Flex,
} from "@nypl/design-system-react-components";

interface DonorCreditProps {
  id: string;
  showBorder: boolean;
  heading?: string;
  description: string;
}

function DonorCredit({
  id,
  showBorder,
  heading,
  description,
}: DonorCreditProps) {
  return (
    <Flex id={`donor-credit-${id}`} flexDirection="column">
      {showBorder && <HorizontalRule marginBottom="xl" marginTop="0" />}
      {heading && <Heading level="three" text={heading} marginBottom="l" />}
      <Box
        fontStyle="italic"
        maxW={{ xl: "850px" }}
        px={{ sm: "s", md: "l", xl: "0" }}
        alignSelf="center"
        marginBottom="0"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Flex>
  );
}

export default DonorCredit;
