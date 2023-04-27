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
  const finalHeading = heading?.trim() ? heading : null;
  return (
    <Flex id={`donor-credit-${id}`} marginBottom="xl" flexDirection="column">
      {showBorder && <HorizontalRule marginBottom="xl" marginTop="0" />}
      {finalHeading && (
        <Heading level="three" text={finalHeading} marginBottom="l" />
      )}
      <Box
        fontStyle="italic"
        maxW={{ lg: "850px" }}
        px={{ sm: "s", md: "l", lg: "0" }}
        sx={{ a: { textDecoration: "underline" } }}
        alignSelf="center"
        marginBottom="0"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Flex>
  );
}

export default DonorCredit;
