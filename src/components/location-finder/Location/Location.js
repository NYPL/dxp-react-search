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

  // Location link
  //const locationLink = `https://www.nypl.org/locations/${location.id}`;

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

  function locationLink(location) {
    let locationUrl;
    switch(location.contentType) {
      // Library
      case 'hub':
      case 'neighborhood':
      case 'research':
        locationUrl = `https://www.nypl.org/locations/${location.slug}`;
        break;
      // Center
      // Pattern: /locations/<parent_slug>/<slug>
      case 'center':
        locationUrl = `https://www.nypl.org/locations/${location.slug}`;
        break;
      // Division
      // Pattern: /locations/divisions/<slug>
      case 'division':
        locationUrl = `https://www.nypl.org/locations/divisions/${location.slug}`;

    }
    return locationUrl;
  }

  return (
    <div className='location'>
      <DS.Heading
        id={ `lid-${location.id}` }
        level={2}
        className='location__name'
      >
        <a href={locationLink(location)}>
          {location.name}
        </a>
      </DS.Heading>
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
