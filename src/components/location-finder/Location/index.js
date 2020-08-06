import React from 'react';
import * as DS from '@nypl/design-system-react-components';
// Redux
import { useDispatch } from 'react-redux';
import { setLocationInfoWindowId, setMapPosition } from './../../../redux/actions';

function Location({ location }) {
  // Redux dispatch
  const dispatch = useDispatch();

  const formattedAddress = `${location.address_line1} ${location.locality}, ${location.administrative_area} ${location.postal_code}`;

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
        text={location.name}
      />
      <div className='address'>
        {formattedAddress}
      </div>
      <div className='phone'>
        {location.phone}
      </div>
      <div className='accessibility-status'>
        {wheelchairAccessIcon}
        {wheelchairAccess}
      </div>
      <div>
        {location.accessibilityNote}
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
      <div className='location__links'>
        <DS.Link
          href="#"
          onClick={onClickViewOnMap}
        >
          View on Map
        </DS.Link>
        |
        <DS.Link
          href="#"
        >
          Get Directions
        </DS.Link>
      </div>
    </div>
  );
}

export default Location;
