const dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

/**
 * Determines if a location is open by comparing today to alerts & closings data.
 *
 * @param {date} today - current datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
 * @param {object} alerts - an object of alerts & closings data.
 * @return {boolean} alertsOpenStatus - true = open | false = closed
 */
function checkAlertsOpenStatus(today, alerts) {
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
        // Check for start and end values
        if (alert.applies.start && alert.applies.end) {
          // Compare alert.applies.start + alert.applies.end to today.
          if (dayjs(today).isBetween(alert.applies.start, alert.applies.end)) {
            alertsOpenStatus = false;
          }
        }
      }
    });
  }

  return alertsOpenStatus;
}

export default checkAlertsOpenStatus;
