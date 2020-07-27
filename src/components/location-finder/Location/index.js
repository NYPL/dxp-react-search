import React from 'react';
import * as DS from '@nypl/design-system-react-components';
// Redux
import { useDispatch } from 'react-redux';
import { setMapCenter } from './../../../redux/actions';

function Location({ location }) {
  // Redux dispatch
  const dispatch = useDispatch();

  const formattedAddress = `${location.address_line1} ${location.locality}, ${location.administrative_area} ${location.postal_code}`;

  let wheelchairAccess;
  switch(location.wheelchairAccess) {
    case 'full':
      wheelchairAccess = 'Fully Accessible'
      break;
    case 'partial':
      wheelchairAccess = 'Partially Accessible'
      break;
    case 'none':
      wheelchairAccess = 'Not Accessible'
      break;
  }

  function onClick(e) {
    e.preventDefault();
    console.log('view on map!');

    dispatch(setMapCenter(location.geoLocation));
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
        {wheelchairAccess}
      </div>
      <div className='location__links'>
        <button onClick={onClick}>View on Map</button>
      </div>
    </div>
  );
}

export default Location;
