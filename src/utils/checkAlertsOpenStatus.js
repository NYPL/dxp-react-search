const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz');
var parseISO = require('date-fns/parseISO');

function checkAlertsOpenStatus(location) {
  const alerts = location._embedded.alerts;
  const tz = 'America/New_York';

  let alertsOpenStatus;
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
          // Get today date only
          const utcToday = utcToZonedTime(new Date(), tz);
          const today = format(utcToday, 'yyyy-MM-dd', { timeZone: tz });
          console.log('today: ' + today);

          // Get start day
          // We strip off incorrect offset added.
          const startDay = format(parseISO(alert.applies.start.replace('-04:00', '')), 'yyyy-MM-dd', { timeZone: tz });
          console.log('startDay: ' + startDay);

          // Get end day
          // We strip off incorrect offset added.
          const endDay = format(parseISO(alert.applies.end.replace('-04:00', '')), 'yyyy-MM-dd', { timeZone: tz });
          console.log('endDay: ' + endDay);

          // Compare startDay, endDay against today
          if (today >= startDay && today <= endDay) {
            alertsOpenStatus = false;
          } else {
            alertsOpenStatus = true;
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
