import setTodaysHours from './setTodaysHours';

// DayJS
const dayjs = require('dayjs');
// DayJS timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

describe('setTodaysHours', () => {
  // Create a dayJS date object for now.
  let now = dayjs('2020-10-28T12:00:00').tz('America/New_York');

  const regularHours = [
    {
      day: 'Wed.',
      open: '10:00',
      close: '18:00'
    }
  ];

  /**
   * Late Opening
   *
   * today: October 28, 12:00pm
   * regular hours start: 10:00am
   * regular hours end: 6:00pm
   * closing start: October 28, 2020 10:00am
   * closing end: October 28, 2020, 12:00pm
   *
   * Expected: Location opens at 12:00pm, instead of 10:00am. Todays Hour's: 12pm-6pm
   */
  const lateOpeningAlerts = [
    {
      closed_for: 'Late Opening',
      applies: {
        start: '2020-10-28T10:00:00-04:00',
        end: '2020-10-28T12:00:00-04:00'
      }
    }
  ];

  const lateOpeningExpectedHours = {
    start: '12:00',
    end: '18:00'
  };

  test('Late Opening', () => {
    const todayHours = setTodaysHours(now, regularHours, lateOpeningAlerts, true);
    expect(todayHours).toMatchObject(lateOpeningExpectedHours);
  });

  /**
   * Early Closing
   *
   * today: October 28, 12:00pm
   * regular hours start: 10:00am
   * regular hours end: 6:00pm
   * closing start: October 28, 2020 16:00am
   * closing end: October 28, 2020, 20:00pm
   *
   * Expected: Location closes early at 4:00pm, instead of 6:00pm. Todays Hour's: 10am-4pm
   */
  const earlyClosingAlerts = [
    {
      closed_for: 'Early Closing.',
      applies: {
        start: '2020-10-28T16:00:00-04:00',
        end: '2020-10-28T20:00:00-04:00'
      }
    }
  ];

  const earlyClosingExpectedHours = {
    start: '10:00',
    end: '16:00'
  };

  test('Early Closing Active', () => {
    const todayHours = setTodaysHours(now, regularHours, earlyClosingAlerts, true);
    expect(todayHours).toMatchObject(earlyClosingExpectedHours);
  });



  // Early Closing Inactive Via Date Range
  /*test('Early Closing Inactive', () => {
    const todayHours = setTodaysHours(now, regularHours, earlyClosingAlerts, false);
    expect(todayHours).toMatchObject(earlyClosingExpectedHours);
  });
  */

  // Late Closing Inactive Via Date Range

  // Early Opening Without Extended Closing Flag

  // Late Closing Without Extended Closing Flag

  // startTimes and endTimes sort works properly (natsort?)



});
