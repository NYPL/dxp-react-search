function distance(lat1, lon1, lat2, lon2) {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lon1 - lon2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return dist;
};

function sortByDistance(origin, locations) {
  console.log('originLat: ' + origin.originLat);
  console.log('originLng: ' + origin.originLng);

  return locations.sort(function (a, b) {
    const origLat = origin.originLat;
    const origLng = origin.originLng;

    const aGeoLat = a.geolocation.coordinates[1];
    const aGeoLng = a.geolocation.coordinates[0];
    const bGeoLat = b.geolocation.coordinates[1];
    const bGeoLng = b.geolocation.coordinates[0];

    return distance(origLat, origLng, aGeoLat, aGeoLng) - distance(origLat, origLng, bGeoLat, bGeoLng);
  });
}

export default sortByDistance;
