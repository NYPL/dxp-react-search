const dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

/**
 * Set today's hours using regular hours or modified hours using alerts closings.
 *
 * @param {object} now - current date object, unformatted.
 * @param {object} regularHours - an object of regular hours data.
 * @param {object} alerts - an object of alerts & closings data.
 * @param {boolean} isActiveClosing - whether or not the closing is active.
 * @return {object} todaysHours - an object of start and end hours for today.
 */
function setTodaysHours(now, regularHours, alerts, isActiveClosing) {
  // Today hours
  const weekDayKeys = new Array('Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.');

  let todayHoursStart;
  let todayHoursEnd;

  regularHours.map(item => {
    if (weekDayKeys[now.day()] === item.day) {
      todayHoursStart = item.open;
      todayHoursEnd = item.close;
    }
  });

  // Add the regular hours values to sortable stacks of hours.
  const startTimes = [todayHoursStart];
  const endTimes = [todayHoursEnd];

  if (isActiveClosing) {
    // We have alerts, so map over them.
    alerts.map(alert => {
      // Check if closed_for key exists
      if ('closed_for' in alert) {
        // Check for start and end values
        if (alert.applies.start && alert.applies.end) {
          // Closing hours
          const closingStartHours = dayjs(alert.applies.start).format('HH:mm');
          const closingEndHours = dayjs(alert.applies.end).format('HH:mm');

          if (closingStartHours > todayHoursStart) {
            endTimes.push(closingStartHours);
          }

          if (closingEndHours < todayHoursEnd) {
            startTimes.push(closingEndHours);
          }
        }
      }
    });

    // Sort the start and end times lowest to highest.
    startTimes.sort();
    endTimes.sort();

    /*console.log('sorted start and end times');
    console.log(startTimes);
    console.log(endTimes);
    */

    // Use the latest start time and the earliest end time.
    const startTime = startTimes.slice(-1).pop();
    const endTime = endTimes[0];

    /*console.log('latest start time and the earliest end time');
    console.log(startTime);
    console.log(endTime);
    */
    
    if (startTime < endTime) {
      todayHoursStart = startTime;
      todayHoursEnd = endTime;
    }
  }

  const todaysHours = {
    start: todayHoursStart,
    end: todayHoursEnd
  };

  return todaysHours;
}

export default setTodaysHours;
