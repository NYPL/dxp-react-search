const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz');
var parseISO = require('date-fns/parseISO');

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

  return locations.reduce((accumlator, location) => {
    // Alerts
    const alerts = location._embedded.alerts;
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
        // If so, set the status to false.
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
            const todayFormatted = format(utcToday, 'yyyy-MM-dd', { timeZone: tz });
            console.log('todayFormatted: ' + todayFormatted);

            // Get start day
            // We strip off incorrect offset added.
            const startDay = format(parseISO(alert.applies.start.replace('-04:00', '')), 'yyyy-MM-dd', { timeZone: tz });
            console.log('startDay: ' + startDay);

            // Get end day
            // We strip off incorrect offset added.
            const endDay = format(parseISO(alert.applies.end.replace('-04:00', '')), 'yyyy-MM-dd', { timeZone: tz });
            console.log('endDay: ' + endDay);

            // Compare startDay, endDay against today
            if (todayFormatted != startDay && todayFormatted <= endDay) {
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
