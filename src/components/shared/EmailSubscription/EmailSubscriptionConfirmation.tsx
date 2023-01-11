import * as React from "react";
import {
  Box,
  Icon,
  IconNames,
  Text,
} from "@nypl/design-system-react-components";

export type StatusCode = "SUCCESS" | "ERROR" | "TEST_MODE";

const iconTable: Record<StatusCode, IconNames> = {
  SUCCESS: "check",
  TEST_MODE: "speakerNotes",
  ERROR: "errorOutline",
};

interface EmailSubscriptionConfirmationProps {
  status: StatusCode;
  bgColor?: string;
  headingColor?: string;
}

export default function EmailSubscriptionConfirmation({
  bgColor,
  headingColor,
  status,
}: EmailSubscriptionConfirmationProps) {
  function getStatusMessage(status: StatusCode) {
    if (status === "SUCCESS") {
      return "Success message to go here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit";
    }
    if (status === "ERROR") {
      return "Error message to go here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit";
    }
    if (status === "TEST_MODE") {
      return "Test mode ....";
    }
  }

  return (
    <Box w="full">
      <Icon
        decorative
        size="large"
        name={iconTable[status]}
        color={bgColor}
        bgColor={headingColor}
        borderRadius="50%"
      />
      <Text alignSelf="center" textAlign="center" marginStart="s" mb="0">
        {getStatusMessage(status)}
      </Text>
    </Box>
  );
}
