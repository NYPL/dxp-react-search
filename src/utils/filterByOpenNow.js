import checkAlertsOpenStatus from './checkAlertsOpenStatus';

// Dayjs
const dayjs = require('dayjs');
// Timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

function filterByOpenNow(locations) {
  const tz = 'America/New_York';
  const today = new Date();

  // Get the current time, in format 13:56
  // Force timezone to new york.
  const nowTime = today.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    hour: '2-digit',
    minute:'2-digit'
  });
  // Get the current day in format: Thu
  // Force timezone to new york.
  const weekday = today.toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short'
  });

  // Dayjs version
  /*const timeZone = 'America/New_York';
  let now = dayjs().tz(timeZone);
  const todayJS = now.format('HH:mm');
  console.log(todayJS);
  */

  const timeZone = 'America/New_York';
  let now = dayjs().tz(timeZone);
  const todayIso8601 = now.format();

  return locations.reduce((accumlator, location) => {
    // Alerts
    const alertsOpenStatus = checkAlertsOpenStatus(todayIso8601, location);

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
