import naturalSort from './naturalSort';

describe('naturalSort', () => {
  const timesArray = [
    '12:00',
    '10:00',
    '02:00',
    '01:00'
  ];

  const timesExpected = [
    '01:00',
    '02:00',
    '10:00',
    '12:00'
  ];

  test('Times are sorted alphanumerically', () => {
    const timesNaturalSort = timesArray.sort(naturalSort);
    console.log(timesNaturalSort);

    expect(timesNaturalSort).toEqual(
      expect.arrayContaining(timesExpected),
    );
  });
});
