import * as React from "react";
import { Box, Heading } from "@nypl/design-system-react-components";

interface EmailSubscriptionWrapperProps {
  id: string;
  bgColor?: string;
  heading?: string;
  headingColor?: string;
  children?: React.ReactNode;
}

export default function EmailSubscriptionWrapper({
  id,
  bgColor,
  heading,
  headingColor,
  children,
}: EmailSubscriptionWrapperProps): JSX.Element {
  return (
    <Box
      id={`email-subscription-wrapper-${id}`}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="full"
      minH="350px"
      padding="l"
      bgColor={bgColor}
      color={headingColor}
      textAlign="center"
      marginY="m"
    >
      <Heading text={heading} w={{ base: "90%", md: "70%" }} />
      {children}
    </Box>
  );
}
