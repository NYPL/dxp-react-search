import * as React from "react";
import {
  Heading,
  Text,
  HorizontalRule,
  Box,
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
    <Box id={id} display="flex" flexDirection="column">
      {showBorder && <HorizontalRule marginBottom="xl" marginTop="0" />}
      {heading && <Heading level="three" text={heading} marginBottom="l" />}
      <Text
        isItalic
        maxW={{ xl: "850px" }}
        px={{ sm: "s", md: "l", xl: "0" }}
        alignSelf="center"
        marginBottom="0"
      >
        {description}
      </Text>
    </Box>
  );
}

export default DonorCredit;
