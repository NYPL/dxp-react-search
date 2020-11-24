const dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

/**
 * Determines if a location has an active closing.
 *
 * @param {date} today - current datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
 * @param {object} alerts - an object of alerts & closings data.
 * @return {boolean} activeClosing - true = active | false = inactive
 */
function hasActiveClosing(today, alerts) {
  let activeClosing = false;

  // Check for any alerts.
  if (alerts === undefined || alerts.length === 0) {
    // No alerts, so set this status to true.
    // Other checks below will determine if the location is open.
    activeClosing = false;
  } else {
    // We have alerts, so map over them.
    alerts.map(alert => {
      // Check if closed_for key exists
      if ('closed_for' in alert) {
        // Check for start and end values
        if (alert.applies.start && alert.applies.end) {
          // Compare alert.applies.start + alert.applies.end to today.
          // 4th parameter: '[]' includes start and end date in comparison.
          // By default, this paramer is '()' which excludes.
          // @see https://day.js.org/docs/en/plugin/is-between
          if (dayjs(today).isBetween(alert.applies.start, alert.applies.end, null, '[]')) {
            activeClosing = true;
          }
        }
      }
    });
  }

  return activeClosing;
}

export default hasActiveClosing;
