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
    const todayHours = setTodaysHours(now, regularHours, lateOpeningAlerts, true, false);
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
    const todayHours = setTodaysHours(now, regularHours, earlyClosingAlerts, true, false);
    expect(todayHours).toMatchObject(earlyClosingExpectedHours);
  });

  /**
   * Holiday Closing
   *
   * today: November 11, 12:00pm
   * regular hours start: 10:00am
   * regular hours end: 6:00pm
   * closing start: November 11, 2020 00:00am
   * closing end: November 11, 2020, 23:59pm
   *
   * Expected: Location is closed.
   */

  // Create a dayJS date object for now.
  let nowHoliday = dayjs('2020-11-11T12:00:00').tz('America/New_York');

  const holidayClosingAlerts = [
    {
      closed_for: 'Closed for Veterans Day.',
      applies: {
        start: '2020-11-11T00:00:00-04:00',
        end: '2020-11-11T23:59:00-04:00'
      }
    }
  ];

  const holidayClosingExpectedHours = {
    start: null,
    end: null
  };

  test('Holiday Closing', () => {
    const todayHours = setTodaysHours(nowHoliday, regularHours, holidayClosingAlerts, true, false);
    expect(todayHours).toMatchObject(holidayClosingExpectedHours);
  });

  /**
   * Inactive Early Closing Via Date Range
   *
   * today: October 28, 12:00pm
   * regular hours start: 10:00am
   * regular hours end: 6:00pm
   * closing start: October 29, 2020 4:00pm
   * closing end: October 30, 2020, 2:00pm
   *
   * Expected: Location has normal regular hours, 10-6pm
   */
  const earlyClosingInactiveClosingAlerts = [
    {
      closed_for: 'Early Closing Inactive Via Date Range',
      applies: {
        start: '2020-10-29T16:00:00-04:00',
        end: '2020-10-30T14:00:00-04:00'
      }
    }
  ];

  const earlyClosingInactiveClosingExpectedHours = {
    start: '10:00',
    end: '18:00'
  };

  test('Early Closing Inactive Via Date Range', () => {
    const todayHours = setTodaysHours(now, regularHours, earlyClosingInactiveClosingAlerts, false, false);
    expect(todayHours).toMatchObject(earlyClosingInactiveClosingExpectedHours);
  });

  // @TODO Additional tests
  // Inactive Late Opening Via Date Range
  // Active Early Closing Without Extended Closing Flag (Content entry issue)
  // Active Late Opening Without Extended Closing Flag (Content entry issue)
});
