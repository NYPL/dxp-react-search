import setTermsFilter, {
  BOROUGHS_UUID,
  ACCESSIBILITY_UUID,
  SUBJECTS_UUID
} from './setTermsFilter';

const originalStateObject = {
  [BOROUGHS_UUID]: {
    terms: [
      'bronx',
      'statenisland'
    ]
  },
  [ACCESSIBILITY_UUID]: {
    terms: [
      'partialaccess'
    ]
  }
}

const expected = [
  {
    id: BOROUGHS_UUID,
    terms: ['bronx', 'statenisland'],
    operator: 'OR'
  },
  {
    id: ACCESSIBILITY_UUID,
    terms: ['partialaccess'],
    operator: 'OR'
  }
];

describe('setTermsFilter', () => {
  test('State object of objects should be converted to an array of objects.', () => {
    expect(
      setTermsFilter(originalStateObject)
    ).toMatchObject(expected);
  });
});