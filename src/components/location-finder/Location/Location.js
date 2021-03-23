import React from 'react';
import * as DS from '@nypl/design-system-react-components';
// Redux
import { useDispatch } from 'react-redux';
import { setMapInfoWindow, setMapPosition } from './../../../redux/actions';
// Components
import LocationAccessibility from './LocationAccessibility';
import LocationHours from './LocationHours';
import LocationDistance from './LocationDistance';
// Hooks
import useWindowSize from './../../../hooks/useWindowSize';

function Location({ location }) {
  // Redux dispatch
  const dispatch = useDispatch();

  const windowSize = useWindowSize();

  // Address formatting.
  const formattedAddress = `${location.address_line1}\n${location.locality}, ${location.administrative_area} ${location.postal_code}`;
  // Get directions link.
  const encodedAddress = encodeURIComponent(formattedAddress);
  const getDirectionsLink = 'http://maps.google.com/maps?f=q&hl=en&saddr=&daddr=' + encodedAddress;

  function onClickViewOnMap(e) {
    e.preventDefault();

    dispatch(setMapPosition({
      mapCenter: location.geoLocation,
      mapZoom: 14
    }));

    dispatch(setMapInfoWindow({
      infoWindowId: location.id,
      infoWindowIsVisible: true
    }));

    if (windowSize < 600) {
      document.getElementById('locations-gmap').scrollIntoView();
    }
  }

  return (
    <div className='location'>
      <DS.Heading
        id={ `lid-${location.id}` }
        level={2}
        className='location__name'
      >
        <a href={location.url}>
          {location.name}
        </a>
      </DS.Heading>
      {location.parentLibraryName &&
        <div className='location__parent'>{location.parentLibraryName}</div>
      }
      <div className='address'>
        {formattedAddress}
      </div>
      <div className='phone'>
        {location.phone}
      </div>
      <LocationAccessibility
        access={location.wheelchairAccess}
        note={location.accessibilityNote}
      />
      <LocationHours
        open={location.open}
        todayHoursStart={location.todayHours.start}
        todayHoursEnd={location.todayHours.end}
        appointmentOnly={location.appointmentOnly}
      />
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
