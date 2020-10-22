import React from 'react';
import * as DS from '@nypl/design-system-react-components';

function LocationAccessibility({ access, note  }) {
  // Wheelchair access and icon.
  let wheelchairAccess, wheelchairAccessIcon;
  switch(access) {
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
  if (note !== null && note !== '') {
    accessibilityNote = `: ${note}`;
  }
  return (
    <div className='accessibility-status'>
      <div>{wheelchairAccessIcon}</div>
      {wheelchairAccess}
      {accessibilityNote}
    </div>
  );
}

export default LocationAccessibility;
