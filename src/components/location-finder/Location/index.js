import React from 'react';
import * as DS from '@nypl/design-system-react-components';
// Redux
import { useDispatch } from 'react-redux';
import { setLocationInfoWindowId, setMapPosition } from './../../../redux/actions';
// Components
import LocationDistance from './LocationDistance';

function Location({ location }) {
  // Redux dispatch
  const dispatch = useDispatch();

  // Address formatting.
  const formattedAddress = `${location.address_line1}\n${location.locality}, ${location.administrative_area} ${location.postal_code}`;
  // Get directions link.
  const encodedAddress = encodeURIComponent(formattedAddress);
  const getDirectionsLink = 'http://maps.google.com/maps?f=q&hl=en&saddr=&daddr=' + encodedAddress;

  // Wheelchair access and icon.
  let wheelchairAccess, wheelchairAccessIcon;
  switch(location.wheelchairAccess) {
    case 'full':
      wheelchairAccess = 'Fully Accessible'
      wheelchairAccessIcon = <DS.Icon decorative name="accessibility_full" />
      break;
    case 'partial':
      wheelchairAccess = 'Partially Accessible'
      wheelchairAccessIcon = <DS.Icon decorative name="accessibility_partial" />
      break;
    case 'none':
      wheelchairAccess = 'Not Accessible'
      break;
  }

  // Accessbiility note.
  let accessibilityNote;
  if (location.accessibilityNote !== null && location.accessibilityNote !== '') {
    accessibilityNote = `: ${location.accessibilityNote}`;
  }

  // Location link
  const locationLink = `https://www.nypl.org/locations/${location.id}`;

  function onClickViewOnMap(e) {
    e.preventDefault();

    dispatch(setMapPosition({
      mapCenter: location.geoLocation,
      mapZoom: 14
    }));

    dispatch(setLocationInfoWindowId(location.id));
  }

  // Convert hours to 12 hour time format
  function formatHours(start, end) {
    // Sometimes refinery will return null for start and end times.
    if (start === null || end === null) {
      return 'No hours available.';
    }

    // Start hour
    const startHoursOnly = +start.substr(0, 2);
    const startHours = (startHoursOnly % 12) || 12;
    const startMeridiem = (startHoursOnly < 12 || startHoursOnly === 24) ? "AM" : "PM";
    // End hour
    const endHoursOnly = +end.substr(0, 2);
    const endHours = (endHoursOnly % 12) || 12;
    const endMeridiem = (endHoursOnly < 12 || endHoursOnly === 24) ? "AM" : "PM";

    return `${startHours}${startMeridiem}–${endHours}${endMeridiem}`;
  }

  return (
    <div className='location'>
      <DS.Heading
        id={location.id}
        level={3}
        className='location__name'
      >
        <a href={locationLink}>
          {location.name}
        </a>
      </DS.Heading>
      <div className='address'>
        {formattedAddress}
      </div>
      <div className='phone'>
        {location.phone}
      </div>
      <div className='accessibility-status'>
        <div>{wheelchairAccessIcon}</div>
        {wheelchairAccess}
        {accessibilityNote}
      </div>
      {location.open ? (
        <div className='location__hours'>
          <DS.Icon
            decorative
            name="clock"
          />
          Today's Hours:
          <div className='location__hours-hours'>
            { formatHours(location.todayHours.start, location.todayHours.end) }
          </div>
        </div>
      ) : (
        <div className='location__hours-status'>
          Location is temporarily closed
        </div>
      )}
      <LocationDistance locationPoint={location.geoLocation} />
      <div className='location__links'>
        <DS.Link type="default">
          <a
            href="#"
            onClick={onClickViewOnMap}
          >
            View on Map
          </a>
        </DS.Link>
        &nbsp;|&nbsp;
        <DS.Link
          href={ getDirectionsLink }
        >
          Get Directions
        </DS.Link>
      </div>
    </div>
  );
}

export default Location;
