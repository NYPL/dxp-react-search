import { matchSorter } from "match-sorter";

/**
 * Sorts an array of locations by distance from an origin geocordinate pair.
 *
 * @param {object} origin - origin geocordinate pair.
 * @param {array} locations - array of location objects.
 * @param {string} searchQuery - search query submitted by user.
 * @return {sort} Return array of location objects, sorted by distance.
 */
function sortByDistance(origin, locations, searchQuery) {
  // Pre-sort the locations based on match of searchQuery.
  locations = matchSorter(locations, searchQuery, {
    keys: ["name"],
    threshold: matchSorter.rankings.NO_MATCH,
  });

  return locations.sort((a, b) => {
    // Origin
    const originGeo = {
      lat: origin.originLat,
      lng: origin.originLng,
    };

    const aGeo = {
      lat: a.geolocation.coordinates[1],
      lng: a.geolocation.coordinates[0],
    };

    const bGeo = {
      lat: b.geolocation.coordinates[1],
      lng: b.geolocation.coordinates[0],
    };

    return distance(originGeo, aGeo) - distance(originGeo, bGeo);
  });
}

/**
 * Compared two geocordinate pairs and determines distance.
 *
 * @param {object} aGeo - geocordinate pair a.
 * @param {object} bGeo - geocordinate pair b.
 * @return {float} Distance between 2 geocordinate points.
 */
function distance(aGeo, bGeo) {
  const radlat1 = (Math.PI * aGeo["lat"]) / 180;
  const radlat2 = (Math.PI * bGeo["lat"]) / 180;
  const theta = aGeo["lng"] - bGeo["lng"];
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return dist;
}

export default sortByDistance;
