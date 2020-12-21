/**
 * Determine if we return all results or paginate the results.
 *
 * @param {array} results - an array of objects.
 * @param {object} args - an object containing query arguments.
 * @return {array} results - an array of objects, all or paginated.
 */
function paginateResults(results, args) {
  //console.log(args);
  // Check for limit and offset, if so, paginate results.
  if (args.limit) {
    console.log('offset: ' + args.offset);
    return results.slice(args.offset, args.limit + args.offset);
  } else {
    console.log('all results returned');
    return results;
  }
}

export default paginateResults;