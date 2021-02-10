import React, { Fragment } from 'react';
import * as DS from '@nypl/design-system-react-components';

function LocationHours({ open, todayHoursStart, todayHoursEnd }) {
  // Convert hours to 12 hour time format
  function formatHours(start, end) {
    // Sometimes refinery will return null for start and end times.
    if (start === null || end === null) {
      return 'Closed.';
    }

    // Start hour
    const startHoursOnly = +start.substr(0, 2);
    const startHours = (startHoursOnly % 12) || 12;
    const startMeridiem = (startHoursOnly < 12 || startHoursOnly === 24) ? "AM" : "PM";
    const startMinutesOnly = start.substr(3, 2);
    const startHoursFinal = (startMinutesOnly != 0) ? (startHours + ':' + startMinutesOnly) : startHours;

    // End hour
    const endHoursOnly = +end.substr(0, 2);
    const endHours = (endHoursOnly % 12) || 12;
    const endMeridiem = (endHoursOnly < 12 || endHoursOnly === 24) ? "AM" : "PM";
    const endMinutesOnly = end.substr(3, 2);
    const endHoursFinal = (endMinutesOnly != 0) ? (endHours + ':' + endMinutesOnly) : endHours;

    return `${startHoursFinal}${startMeridiem}–${endHoursFinal}${endMeridiem}`;
  }

  return (
    <Fragment>
      {open ? (
        <div className='location__hours'>
          <DS.Icon
            decorative
            name="clock"
          />
          Today's Hours:
          <div className='location__hours-hours'>
            {formatHours(todayHoursStart, todayHoursEnd)}
          </div>
        </div>
      ) : (
          <DS.StatusBadge level={"medium"} statusBadgeText={"Location is temporarily closed"} />
        )}
    </Fragment>
  );
}

export default LocationHours;
