import hasActiveClosing from './hasActiveClosing';

/**
 * Takes an array of locations and reduces the array to only open now Locations.
 *
 * @param {object} now - current date object, unformatted.
 * @param {array} locations - an array of Locations
 * @return {array} a reduced array of locations that are open now.
 */
function filterByOpenNow(now, locations) {
  // Format the now date object in the various formats we need.
  const nowTime = now.format('HH:mm');
  const weekday = now.format('ddd');
  const today = now.format();

  return locations.reduce((accumulator, location) => {
    // Alerts
    const isActiveClosing = hasActiveClosing(today, location._embedded.alerts, null);

    location.hours.regular.map(hoursItem => {
      // Find today in weekly hours.
      if (hoursItem.day.replace('.','') === weekday) {
        // Multiple checks to determine if the location is open now.
        if (
          // Check for not null.
          hoursItem.open !== null && hoursItem.close !== null
          // Check for active closing.
          && !isActiveClosing
          // Check open/closed hours against now time.
          && hoursItem.open <= nowTime && hoursItem.close >= nowTime
        ) {
          // Add location as open to accumulator.
          accumulator.push(location);
        }
      }
    });
    return accumulator;
  }, []);
}

export default filterByOpenNow;
