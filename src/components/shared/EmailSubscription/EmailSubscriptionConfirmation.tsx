import * as React from "react";
import { Box, Icon, IconNames } from "@nypl/design-system-react-components";

export type StatusCode = "SUCCESS" | "ERROR" | "TEST_MODE";

const iconTable: Record<StatusCode, IconNames> = {
  SUCCESS: "check",
  TEST_MODE: "speakerNotes",
  ERROR: "errorOutline",
};

interface EmailSubscriptionConfirmationProps {
  id: string;
  status?: StatusCode;
  isSubmitted: boolean;
  bgColor?: string;
  headingColor?: string;
}

export default function EmailSubscriptionConfirmation({
  id,
  status,
  isSubmitted,
  bgColor,
  headingColor,
}: EmailSubscriptionConfirmationProps) {
  function getStatusMessage(status: StatusCode): string {
    if (status === "SUCCESS") {
      return "Thank you! You have successfully subscribed to our email updates! You can update your email subscription preferences at any time using the links at the bottom of the email.";
    }
    if (status === "ERROR") {
      return "An error has occurred while attempting to save your information. Please refresh this page and try again. If this error persists, <a href='mailto:enews@nypl.org?subject=Please re-activate my e-mail address'>contact our e-mail team</a>.";
    }
    if (status === "TEST_MODE") {
      return "Thank you! You are currently in test mode, but the form submitted correctly.";
    } else {
      return "UNKNOWN STATUS";
    }
  }

  return (
    <Box
      id={`email-subscription-confirmation-${id}`}
      w="full"
      role="log"
      aria-live="polite"
      aria-atomic="true"
      aria-relevant="additions"
    >
      {isSubmitted && status && (
        <>
          <Icon
            decorative
            size="large"
            name={iconTable[status]}
            color={bgColor}
            bgColor={headingColor}
            borderRadius="50%"
          />
          <Box
            alignSelf="center"
            textAlign="center"
            marginStart="s"
            mb="0"
            sx={{ a: { color: "ui.white", textDecoration: "underline" } }}
            dangerouslySetInnerHTML={{ __html: getStatusMessage(status) }}
          />
        </>
      )}
    </Box>
  );
}
