import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  HorizontalRule,
} from "@nypl/design-system-react-components";

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
    <Flex id={id} flexDir="column">
      {showBorder && <HorizontalRule marginTop={0} marginBottom="xl" />}
      {heading && <Heading level="three" marginBottom="l" text={heading} />}
      <Box
        as="p"
        maxW={{ xl: "850px" }}
        fontStyle="italic"
        alignSelf="center"
        px={{ sm: "s", md: "l", xl: 0 }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Flex>
  );
}
