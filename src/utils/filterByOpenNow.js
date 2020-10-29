import checkAlertsOpenStatus from './checkAlertsOpenStatus';

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

  return locations.reduce((accumlator, location) => {
    // Alerts
    const alertsOpenStatus = checkAlertsOpenStatus(today, location._embedded.alerts);

    location.hours.regular.map(hoursItem => {
      // Find today in weekly hours.
      if (hoursItem.day.replace('.','') === weekday) {
        // Multiple checks to determine if the location is open now.
        if (
          // Check for not null.
          hoursItem.open !== null && hoursItem.close !== null
          // Check for alert closings.
          && alertsOpenStatus
          // Check for extended closing.
          && location.open
          // Check open/closed hours against now time.
          && hoursItem.open <= nowTime && hoursItem.close >= nowTime
        ) {
          // Add location as open to accumulator.
          accumlator.push(location);
        }
      }
    });
    return accumlator;
  }, []);
}

export default filterByOpenNow;
