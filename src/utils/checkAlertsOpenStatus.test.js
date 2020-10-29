import checkAlertsOpenStatus from './checkAlertsOpenStatus';

describe('checkAlertsOpenStatus', () => {
  /**
   * Temporary closing, one.
   *
   * today: October 27, 12:00pm
   * closing start: October 27, 2020 10:15am
   * closing end: October 27, 2021, 10:15am
   *
   * Expected: Closed (false)
   */
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

  test('One active temporary closing should return false.', () => {
    expect(
      checkAlertsOpenStatus('2020-10-27T12:00:00-04:00', alertsTempClosingOne)
    ).toBe(false);
  });

  /**
   * Temporary closing, many.
   *
   * today: October 27, 2020, 12:00pm
   *
   * closing start: October 27, 2020 10:15am
   * closing end: October 27, 2021, 10:15am
   *
   * closing 2 start: October 28, 2020, 12:00pm
   * closing 2 end: October 29, 2020, 11:59pm
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

  test('Many temporary closings, only 1 active, should return false.', () => {
    expect(
      checkAlertsOpenStatus('2020-10-27T12:00:00-04:00', alertsTempClosingMany)
    ).toBe(false);
  });


  /**
   * Test that hours and mins in alert are accounted for, inactive.
   *
   * today: October 27, 12:00pm
   * closing start: October 27, 2020 12:00pm
   * closing end: October 28, 2020, 12:15pm
   *
   * Expected: Open (true). Closing does not start until 12:01pm
   */
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

  test('A single temporary closing with inactive hours should return true.', () => {
    expect(
      checkAlertsOpenStatus('2020-10-27T12:00:00-04:00', alertsHoursMins)
    ).toBe(true);
  });

  /**
   * Test that hours and mins in alert is accounted for, active.
   *
   * today: October 27, 12:05pm
   * closing start: October 27, 2020 12:00pm
   * closing end: October 28, 2021, 12:15pm
   *
   * Expected: Closed (false). 12:05pm and the location is closed.
   */
  const alertsHoursMinsActive = [
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

  test('A single temporary closing with active hours should return false.', () => {
    expect(
      checkAlertsOpenStatus('2020-10-27T12:05:00-04:00', alertsHoursMinsActive)
    ).toBe(false);
  });
});
