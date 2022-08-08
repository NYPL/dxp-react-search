import formatPhoneNumber from './formatPhoneNumber';

describe('formatPhoneNumber', () => {
  const unformattedPhoneData = [
    '9172756975',
    '(212)-752-3824',
    '(212) 714-8400',
    '917-275-6975',
  ];

  const expectedPhoneNumbers = [
    '917-275-6975',
    '212-752-3824',
    '212-714-8400',
    '917-275-6975',
  ];
  
  const badPhoneData = [
    '',
    null,
    undefined,
    '123456789', // missing digit
    'ABCDEFGHIJ', // 10 characters, but not numbers
    'badDataReturnEmptyString'
  ];

  test('Phone numbers are displayed in the correct format', () => {
    const formattedPhoneNumbers = unformattedPhoneData.map((number) => formatPhoneNumber(number));
    expect(formattedPhoneNumbers).toEqual(expectedPhoneNumbers);
  });

  test('Any bad data should return an empty string', () => {
    badPhoneData.forEach((data) => {
      expect(formatPhoneNumber(data)).toEqual('');
    });
  });
});