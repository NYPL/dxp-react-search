// DayJS
const dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
// Utils
import naturalSort from './naturalSort';

/**
 * Set today's hours using regular hours or modified hours using alerts closings.
 *
 * @param {object} now - current date object, unformatted.
 * @param {object} regularHours - an object of regular hours data.
 * @param {object} alerts - an object of alerts & closings data.
 * @param {boolean} hasActiveClosing - whether the closing is active.
 * @param {boolean} isExtendedClosing - whether or not its an extended closing.
 * @return {object} todaysHours - an object of start and end hours for today.
 */
function setTodaysHours(now, regularHours, alerts, hasActiveClosing, isExtendedClosing) {
  // Today hours
  const weekDayKeys = new Array('Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.');

  let todayHoursStart;
  let todayHoursEnd;

  // Get todays regular hours.
  regularHours.map(item => {
    if (weekDayKeys[now.day()] === item.day) {
      todayHoursStart = item.open;
      todayHoursEnd = item.close;
    }
  });

  let todaysHours = {
    start: todayHoursStart,
    end: todayHoursEnd
  };

  // Active closing, not extended closing
  // Return hours as closed (null) or modify hours.
  if (hasActiveClosing && !isExtendedClosing) {
    // Add the regular hours values to sortable stacks of hours.
    const startTimes = [todayHoursStart];
    const endTimes = [todayHoursEnd];

    // We have alerts, so map over them.
    alerts.some(alert => {
      // Check if closed_for key exists
      if ('closed_for' in alert) {
        // Check for start and end values
        if (alert.applies.start && alert.applies.end) {
          // Closing hours
          const closingStartHours = dayjs(alert.applies.start).format('HH:mm');
          const closingEndHours = dayjs(alert.applies.end).format('HH:mm');

          const today = now.format('YYYY-MM-DD');
          const closingStartsThisDay = dayjs(alert.applies.start).format('YYYY-MM-DD') === today;
          const closingEndsThisDay = dayjs(alert.applies.end).format('YYYY-MM-DD') === today;

          // Return as "Closed"
          if (
            // Closing spans this entire day, so return NULL for closed.
            !closingStartsThisDay && !closingEndsThisDay
            // Closing starts before today, but ends after regular hours this day.
            || !closingStartsThisDay && closingEndHours >= todayHoursEnd
            // Closing ends after today, but starts before regular hours this day.
            || !closingEndsThisDay && closingStartHours <= todayHoursStart
            // Closing spans regular hours, so return NULL for closed.
            || closingStartHours <= todayHoursStart && closingEndHours >= todayHoursEnd
          ) {
            console.log('closed!');
            todaysHours = {
              start: null,
              end: null
            };
          } else {
          // Return regular hours modified.
            if (closingStartHours > todayHoursStart) {
              endTimes.push(closingStartHours);
            }

            if (closingEndHours < todayHoursEnd) {
              startTimes.push(closingEndHours);
            }

            // Sort the start and end times lowest to highest.
            startTimes.sort(naturalSort);
            endTimes.sort(naturalSort);

            console.log('startTimes');
            console.log(startTimes);

            // Use the latest start time and the earliest end time.
            const startTime = startTimes.slice(-1).pop();
            const endTime = endTimes[0];

            if (startTime < endTime) {
              console.log('modified hours!');
              todaysHours = {
                start: startTime,
                end: endTime
              };
            }
          }
        }
      }
    });
  }

  return todaysHours;
}

export default setTodaysHours;
