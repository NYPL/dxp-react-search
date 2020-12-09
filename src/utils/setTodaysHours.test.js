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

  test('Closing (non-extended) starts yesterday and ends tomorrow should return closed.', () => {
    const alerts = [
      {
        closed_for: 'Computer repairs',
        applies: {
          start: '2020-10-27T10:00:00-04:00',
          end: '2020-10-29T12:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: null,
      end: null
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Closing (non-extended) starts yesterday and ends today after regular hours should return closed.', () => {
    const alerts = [
      {
        closed_for: 'Computer repairs',
        applies: {
          start: '2020-10-27T10:00:00-04:00',
          end: '2020-10-28T19:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: null,
      end: null
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Late opening should return modified hours.', () => {
    const alerts = [
      {
        closed_for: 'Late Opening',
        applies: {
          start: '2020-10-28T10:00:00-04:00',
          end: '2020-10-28T12:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: '12:00',
      end: '18:00'
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Early closing should return modified hours.', () => {
    const alerts = [
      {
        closed_for: 'Early Closing.',
        applies: {
          start: '2020-10-28T16:00:00-04:00',
          end: '2020-10-28T20:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: '10:00',
      end: '16:00'
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Holiday or all day closing should return closed.', () => {
    // Create a dayJS date object for now.
    let nowHoliday = dayjs('2020-11-11T12:00:00').tz('America/New_York');

    const alerts = [
      {
        closed_for: 'Closed for Veterans Day.',
        applies: {
          start: '2020-11-11T00:00:00-04:00',
          end: '2020-11-11T23:59:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: null,
      end: null
    };

    const todayHours = setTodaysHours(nowHoliday, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Early closing (inactive) should return regular hours.', () => {
    const alerts = [
      {
        closed_for: 'Future early closing!',
        applies: {
          start: '2020-10-29T16:00:00-04:00',
          end: '2020-10-30T14:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: '10:00',
      end: '18:00'
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, false, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Closing (non-extended) starts today before opening and ends tomorrow should return closed.', () => {
    const alerts = [
      {
        closed_for: 'Computer repairs',
        applies: {
          start: '2020-10-28T10:00:00-04:00',
          end: '2020-10-29T12:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: null,
      end: null
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Late opening that starts before today should return modified hours.', () => {
    const alerts = [
      {
        closed_for: 'Computer repairs',
        applies: {
          start: '2020-10-27T10:00:00-04:00',
          end: '2020-10-28T15:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: '15:00',
      end: '18:00'
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });

  test('Early closing starts after opening and ends after closing.', () => {
    const alerts = [
      {
        closed_for: 'Computer repairs',
        applies: {
          start: '2020-10-28T15:03:00-04:00',
          end: '2020-10-28T23:00:00-04:00'
        }
      }
    ];

    const expectedHours = {
      start: '10:00',
      end: '15:03'
    };

    const todayHours = setTodaysHours(now, regularHours, alerts, true, false);
    expect(todayHours).toMatchObject(expectedHours);
  });
});
