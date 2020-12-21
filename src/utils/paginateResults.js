// Determine if we return all results or paginate.
function paginateResults(results, args) {
  // Check for limit and offset, if so, paginate results.
  if (args.limit) {
    console.log('offset: ' + args.offset);
    return results.slice(args.offset, args.limit + args.offset);
  } else {
    return results;
  }
}

export default paginateResults;