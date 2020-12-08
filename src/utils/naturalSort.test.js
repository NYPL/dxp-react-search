import naturalSort from './naturalSort';

describe('naturalSort', () => {
  const timesArray = [
    '12:40',
    '10:00',
    '02:30',
    '01:00'
  ];

  const timesExpected = [
    '01:00',
    '02:30',
    '10:00',
    '12:40'
  ];

  test('Times are sorted alphanumerically', () => {
    const timesNaturalSort = timesArray.sort(naturalSort);

    expect(timesNaturalSort).toEqual(
      expect.arrayContaining(timesExpected),
    );
  });
});
