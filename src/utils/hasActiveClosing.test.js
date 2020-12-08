import hasActiveClosing from './hasActiveClosing';

describe('hasActiveClosing', () => {
  test('One active temporary closing should return true.', () => {
    const alerts = [
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

    expect(
      hasActiveClosing('2020-10-27T12:00:00-04:00', alerts)
    ).toBe(true);
  });

  test('Many temporary closings, only 1 active, should return true.', () => {
    const alerts = [
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

    expect(
      hasActiveClosing('2020-10-27T12:00:00-04:00', alerts)
    ).toBe(true);
  });

  test('A single temporary closing with inactive hours and mins should return false.', () => {
    const alerts = [
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

    expect(
      hasActiveClosing('2020-10-27T12:00:00-04:00', alerts)
    ).toBe(false);
  });

  test('A single temporary closing with active hours and mins should return true.', () => {
    const alerts = [
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

    expect(
      hasActiveClosing('2020-10-27T12:05:00-04:00', alerts)
    ).toBe(true);
  });

  test('A late opening should be considered an active closing.', () => {
    const alerts = [
      {
        closed_for: 'Late Opening',
        applies: {
          start: '2020-10-28T10:00:00-04:00',
          end: '2020-10-28T12:00:00-04:00'
        }
      }
    ];

    expect(
      hasActiveClosing('2020-10-28T12:00:00-04:00', alerts)
    ).toBe(true);
  });

  test('A early closing should be considered an active closing.', () => {
    const alerts = [
      {
        closed_for: 'Early closing',
        applies: {
          start: '2020-10-27T14:00:00-04:00',
          end: '2020-10-27T22:00:00-04:00'
        }
      }
    ];

    expect(
      hasActiveClosing('2020-10-27T14:05:00-04:00', alerts)
    ).toBe(true);
  });
});
