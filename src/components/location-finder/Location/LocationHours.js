import React, { Fragment } from 'react';
import { Icon, StatusBadge } from '@nypl/design-system-react-components';

function LocationHours({ open, todayHoursStart, todayHoursEnd, appointmentOnly }) {
  // Convert hours to 12 hour time format
  function formatHours(start, end, appointment) {
    // Sometimes refinery will return null for start and end times.
    if (start === null || end === null) {
      return 'Closed';
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
    
    let formattedHours;
    formattedHours = `${startHoursFinal}${startMeridiem}–${endHoursFinal}${endMeridiem}`;
    
    // Append asterisk for by appointment only.
    if (appointment) {
      formattedHours = `${formattedHours}*`
    }

    return formattedHours;
  }

  return (
    <Fragment>
      {open ? (
        <div className='location__hours'>
          <Icon
            decorative
            name="clock"
          />
          Today's Hours:
          <div className='location__hours-hours'>
            {formatHours(todayHoursStart, todayHoursEnd, appointmentOnly)}
          </div>
        </div>
      ) : (
        <StatusBadge 
          level={"medium"} 
          statusBadgeText={"Location is temporarily closed"}
          className={'location__hours-status'}
        />
      )}
      {appointmentOnly && todayHoursStart && todayHoursEnd &&
        <div className='location__hours-appointment'>
          * Division is by appointment only.
        </div>
      }
    </Fragment>
  );
}

export default LocationHours;
