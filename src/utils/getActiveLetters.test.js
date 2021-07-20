import getActiveLetters from './getActiveLetters';

describe('getActiveLetters', () => {
  const items = [
    {
      name: 'Alaska'
    },
    {
      name: 'Buffalo'
    },
    {
      name: 'Florida'
    },
    {
      name: ' New York   '
    },
    {
      name: ' New Jersey '
    }
  ];

  const expectedItems = [
    'A', 
    'B',
    'F',
    'N'
  ];

  test('Letters array is built correctly', () => {
    const activeLetters = getActiveLetters(items, 'name');

    expect(activeLetters).toEqual(
      expect.arrayContaining(expectedItems),
    );
  });
});