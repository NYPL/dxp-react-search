import React from "react";
import {
  Box,
  HStack,
  Icon,
  IconNames,
  IconSizes,
} from "@nypl/design-system-react-components";

interface LocationAccessibilityProps {
  access: AccessNames;
  note?: string;
}

enum AccessNames {
  Full = "full",
  Partial = "partial",
  None = "none",
}

function LocationAccessibility({ access, note }: LocationAccessibilityProps) {
  // Wheelchair access and icon.
  let wheelchairAccess, wheelchairAccessIcon;
  switch (access) {
    case "full":
      wheelchairAccess = "Fully Accessible";
      wheelchairAccessIcon = (
        <Icon name={IconNames.AccessibilityFull} size={IconSizes.Large} />
      );
      break;
    case "partial":
      wheelchairAccess = "Partially Accessible";
      wheelchairAccessIcon = (
        <Icon name={IconNames.AccessibilityPartial} size={IconSizes.Large} />
      );
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
