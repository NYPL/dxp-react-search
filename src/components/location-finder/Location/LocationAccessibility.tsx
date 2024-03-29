import React from "react";
import { Box, HStack, Icon } from "@nypl/design-system-react-components";

interface LocationAccessibilityProps {
  access: "full" | "partial" | "none";
  note?: string;
}

function LocationAccessibility({ access, note }: LocationAccessibilityProps) {
  // Wheelchair access and icon.
  let wheelchairAccess, wheelchairAccessIcon;
  switch (access) {
    case "full":
      wheelchairAccess = "Fully Accessible";
      wheelchairAccessIcon = <Icon name="accessibilityFull" size="large" />;
      break;
    case "partial":
      wheelchairAccess = "Partially Accessible";
      wheelchairAccessIcon = <Icon name="accessibilityPartial" size="large" />;
      break;
    case "none":
      wheelchairAccess = "Not Accessible";
      break;
  }

  // Accessbiility note.
  let accessibilityNote;
  if (note !== null && note !== "") {
    accessibilityNote = `: ${note}`;
  }
  return (
    <HStack align="flex-start">
      <Box>{wheelchairAccessIcon}</Box>
      <Box>
        {wheelchairAccess} {accessibilityNote}
      </Box>
    </HStack>
  );
}

export default LocationAccessibility;
