const dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
// Timezone
/*var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc)
dayjs.extend(timezone)
*/

function checkAlertsOpenStatus(today, location) {
  /*const timeZone = 'America/New_York';
  let now = dayjs().tz(timeZone);
  const today = now.format();
  */
  //console.log('today: ' + today);
  const alerts = location._embedded.alerts;
  //console.log(alerts);

  let alertsOpenStatus = true;
  // Check for any alerts.
  if (alerts === undefined || alerts.length === 0) {
    // No alerts, so set this status to true.
    // Other checks below will determine if the location is open.
    alertsOpenStatus = true;
  } else {
    // We have alerts, so map over them.
    alerts.map(alert => {
      // Check if closed_for key exists
      if ('closed_for' in alert) {
        // Compare alert.applies.start + alert.applies.end to today.
        //
        // Refinery Format:
        // 2020-07-08T00:00:00-04:00 -- 2030-07-09T00:00:00-04:00
        //
        // @SEE https://github.com/NYPL/locations-app/search?q=applies.start&unscoped_q=applies.start
        //
        if (alert.applies.start && alert.applies.end) {
          // Dayjs version
          if (dayjs(today).isBetween(alert.applies.start, alert.applies.end)) {
            alertsOpenStatus = false;
          }
        }
      } else {
        alertsOpenStatus = true;
      }
    });
  }

  return alertsOpenStatus;
}

export default checkAlertsOpenStatus;
