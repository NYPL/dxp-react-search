import React from 'react';
// Redux
import { useSelector } from 'react-redux';

function LocationDistance({ locationPoint }) {
  // Redux
  const { searchQueryGeoLat, searchQueryGeoLng } = useSelector(state => state.search);
  // Set vars
  const searchQueryPoint = {
    'lat': searchQueryGeoLat,
    'lng': searchQueryGeoLng
  };

  // Calculate distance between points.
  function haversineDistance(searchQueryPoint, locationPoint) {
    // Radius of the Earth in miles
    var R = 3958.8;
    // Convert degrees to radians
    var rlat1 = searchQueryPoint.lat * (Math.PI/180);
    // Convert degrees to radians
    var rlat2 = locationPoint.lat * (Math.PI/180);
    // Radian difference (latitudes)
    var difflat = rlat2-rlat1;
    // Radian difference (longitudes)
    var difflon = (locationPoint.lng-searchQueryPoint.lng) * (Math.PI/180);
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

  if (searchQueryGeoLat && searchQueryGeoLng) {
    return (
      <div className='location__distance'>
        Distance: <strong>{haversineDistance(searchQueryPoint, locationPoint).toFixed(1)} miles</strong>
      </div>
    );
  } else {
    return (null);
  }
}

export default LocationDistance;
