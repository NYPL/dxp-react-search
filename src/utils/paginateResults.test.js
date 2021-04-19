import paginateResults from './paginateResults';

describe('paginateResults', () => {
  // Pagination, page 1
  const args = {
    limit: 10,
    offset: 0,
  };

  // Pagination, pg 2
  const args2 = {
    limit: 10,
    offset: 10,
  };

  // Pagination, pg 8
  const args8 = {
    limit: 10,
    offset: 70,
  };
 
  // No pagination, all results
  const argsAll = {
    limit: 300,
    offset: 0,
  };
 
  // Mock the results array with 300 items
  const results = [...Array(300).keys()];

  test('All results are returned if no offset is provided.', () => {
    expect(
      paginateResults(results, argsAll)
    ).toEqual(expect.arrayContaining(results));
  });

  test('The first 10 results are returned if no offset is provided and limit is 10.', () => {
    expect(
      paginateResults(results, args)
    ).toEqual(expect.arrayContaining([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  test('Page 8 of the results are returned when an offset of 70 is provided and limit is 10.', () => {
    expect(
      paginateResults(results, args8)
    ).toEqual(expect.arrayContaining([ 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 ]));
  });
});