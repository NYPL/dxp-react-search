import checkAlertsOpenStatus from './checkAlertsOpenStatus';

/**
 * Temporary closing, one.
 *
 * today: October 27, 12:00pm
 * closing start: October 27, 2020 10:15am
 * closing end: October 27, 2021, 10:15am
 *
 * Expected: Closed (false)
 */
let today = '2020-10-27T12:00:00-04:00';
const alertsTempClosingOne = [
  {
    id: '11',
    scope: 'location',
    msg: '<p>Temporarily closed due to COVID-19.</p>\n',
    display: {
      start: '2020-10-27T10:15:00-04:00',
      end: '2021-10-27T10:15:00-04:00'
    },
    closed_for: 'Temporarily closed due to COVID-19.\n',
    applies: {
      start: '2020-10-27T10:15:00-04:00',
      end: '2021-10-27T10:15:00-04:00'
    }
  }
];

test('Temporary closing, one', () => {
  expect(checkAlertsOpenStatus(today, alertsTempClosingOne)).toBe(false);
});

/**
 * Temporary closing, many.
 *
 * today: October 27, 12:00pm
 * closing start: October 27, 2020 10:15am
 * closing end: October 27, 2021, 10:15am
 *
 *
 *
 *
 * Expected: Closed (false)
 */

const alertsTempClosingMany = [
  {
    id: '11',
    scope: 'location',
    msg: '<p>Temporarily closed due to COVID-19.</p>\n',
    display: {
      start: '2020-10-27T10:15:00-04:00',
      end: '2021-10-27T10:15:00-04:00'
    },
    closed_for: 'Temporarily closed due to COVID-19.\n',
    applies: {
      start: '2020-10-27T10:15:00-04:00',
      end: '2021-10-27T10:15:00-04:00'
    }
  },
  {
    id: "9",
    scope: "location",
    display: {
      start: "2020-10-21T09:00:00-04:00",
      end: "2020-10-30T00:00:00-04:00"
    },
    closed_for: "Library specific closing.",
    applies: {
      start: "2020-10-28T00:00:00-04:00",
      end: "2020-10-29T23:59:00-04:00"
    }
  }
];

test('Temporary closing, many', () => {
  expect(checkAlertsOpenStatus(today, alertsTempClosingMany)).toBe(false);
});


/**
 * Test that hours and mins in alert datetime is respected.
 *
 * today: October 27, 12:00pm
 * closing start: October 27, 2020 12:00pm
 * closing end: October 28, 2020, 12:15pm
 *
 * Expected: Open (true). Closing does not start until 12:01pm
 */
today = '2020-10-27T12:00:00-04:00';
const alertsHoursMins = [
  {
    id: '11',
    scope: 'location',
    msg: 'Single day closing with specific hours.',
    display: {
      start: '2020-10-27T12:01:00-04:00',
      end: '2021-10-27T12:01:00-04:00'
    },
    closed_for: 'Single day closing with specific hours.',
    applies: {
      start: '2020-10-27T12:01:00-04:00',
      end: '2021-10-28T12:01:00-04:00'
    }
  }
];

test('Alerts hours and minutes are respected', () => {
  expect(checkAlertsOpenStatus(today, alertsHoursMins)).toBe(true);
});
