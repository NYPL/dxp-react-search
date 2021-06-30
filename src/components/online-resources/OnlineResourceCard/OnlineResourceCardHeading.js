import React from 'react';
// Next
import Link from 'next/link';
//
import { 
  Heading,
} from '@nypl/design-system-react-components';

function OnlineResourceCardHeading(props) {
  const { 
    id, 
    name, 
    accessibleFrom, 
    accessLocations, 
    resourceUrl, 
    slug,
    allLocationMatches
  } = props;

  function linkAccessCheck() {
    /*
    @TODO
    // Better
    let locationMatchesArray = [];
    allLocationMatches?.items.map(locationMatch => 
      locationMatchesArray.push(locationMatch.locationId)
    */
    
    let locationMatchesArray = [];
    allLocationMatches?.items.map(locationMatch => {
      locationMatchesArray.push(locationMatch.locationId);
    });

    let accessLocationsArray = [];
    accessLocations?.map(accessLocation => {
      accessLocationsArray.push(accessLocation.id);
    });
  
    const linkAccess = locationMatchesArray
      .filter(e => accessLocationsArray.includes(e));
        
    return linkAccess.length;
  }

  if (linkAccessCheck() || accessibleFrom?.includes('offsite')) {
    if (resourceUrl) {
      return (
        <h3 id={id}>
          <a href={resourceUrl}>{name}</a>
        </h3>
      );
    } else {
      return (
        <h3 id={id}>
          <Link href={slug}>
            <a>{name}</a>
          </Link>
        </h3>
      );
    }
  } else {
    return (
      <h3 id={id}>{name}</h3>
    );
  }
}

export default OnlineResourceCardHeading;