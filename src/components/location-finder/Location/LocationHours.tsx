import React from "react";
import {
  Box,
  HStack,
  Icon,
  IconNames,
  IconSizes,
  StatusBadge,
  StatusBadgeTypes,
} from "@nypl/design-system-react-components";

interface LocationHoursProps {
  open: boolean;
  todayHoursStart: string;
  todayHoursEnd: string;
  appointmentOnly: boolean;
}

function LocationHours({
  open,
  todayHoursStart,
  todayHoursEnd,
  appointmentOnly,
}: LocationHoursProps) {
  // Convert hours to 12 hour time format
  function formatHours(start: string, end: string, appointment: boolean) {
    // Sometimes refinery will return null for start and end times.
    if (start === null || end === null) {
      return "Closed";
    }
    // Start hour
    const startHoursOnly = +start.substr(0, 2);
    const startHours = startHoursOnly % 12 || 12;
    const startMeridiem =
      startHoursOnly < 12 || startHoursOnly === 24 ? "AM" : "PM";
    const startMinutesOnly = start.substr(3, 2);
    const startHoursFinal =
      // @ts-ignore
      startMinutesOnly != 0 ? startHours + ":" + startMinutesOnly : startHours;
    // End hour
    const endHoursOnly = +end.substr(0, 2);
    const endHours = endHoursOnly % 12 || 12;
    const endMeridiem = endHoursOnly < 12 || endHoursOnly === 24 ? "AM" : "PM";
    const endMinutesOnly = end.substr(3, 2);
    const endHoursFinal =
      // @ts-ignore
      endMinutesOnly != 0 ? endHours + ":" + endMinutesOnly : endHours;
    // Append asterisk if location hours are by appointment only.
    return `${startHoursFinal}${startMeridiem}–${endHoursFinal}${endMeridiem}${
      appointment ? `*` : ``
    }`;
  }

  return (
    <>
      {open ? (
        <HStack align="center">
          <Icon name={IconNames.Clock} size={IconSizes.Large} />
          <Box>Today's Hours:</Box>
          <Box fontWeight="bold">
            {formatHours(todayHoursStart, todayHoursEnd, appointmentOnly)}
          </Box>
        </HStack>
      ) : (
        <StatusBadge level={StatusBadgeTypes.Medium}>
          Location is temporarily closed
        </StatusBadge>
      )}
      {appointmentOnly && todayHoursStart && todayHoursEnd && (
        <Box pl={8} fontWeight="bold">
          * Division is by appointment only.
        </Box>
      )}
    </>
  );
}

export default LocationHours;
