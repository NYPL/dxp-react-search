import React from 'react';
import * as DS from '@nypl/design-system-react-components';

function Location({ location }) {
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

  return (
    <div className='location'>
      <DS.Heading
        id={location.id}
        level={2}
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
    </div>
  );
}

export default Location;
