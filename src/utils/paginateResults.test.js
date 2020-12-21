import paginateResults from './paginateResults';

describe('paginateResults', () => {
  // Pagination, page 1
  const args = {
    limit: 10,
    offset: 0,
  };

  // Pagination, pg 2
  /*const args = {
    limit: 10,
    offset: 10,
  };

  // Pagination, pg 8
  const args = {
    limit: 10,
    offset: 70,
  };
  */

  // No pagination, all results
  /*const args = {
    limit: 300,
    offset: 0,
  };
  */

  test('All results are returned if no pagination args are provided.', () => {

  });

  test('Some results are returned if pagination args are provided.', () => {

  });
});