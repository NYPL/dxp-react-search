// @see https://github.com/NYPL/locations-app/blob/936bd5566631fa159135bd0966129527bad2506a/public/scripts/directives/nypl_directives.js

//
function filterBySearchInput(data, searchTerm) {
  return data.filter(function (elem) {
    if (elem.name) {
      return (cleanText(elem.name).indexOf(cleanText(searchTerm)) >= 0 ||
        cleanText(elem.locality).indexOf(cleanText(searchTerm)) >= 0 ||
        cleanText(elem.postal_code).indexOf(cleanText(searchTerm)) >= 0 );
    }
  });
}

// Helper function to clean text
function cleanText(text) {
  return text
    .replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "")
    .toLowerCase();
}

//
/*function filterStartsWith(data, searchTerm) {
  return data.filter(function (elem) {
    if (elem.name) {
      return elem.name.substring(0, searchTerm.length).toLowerCase()
        === searchTerm.toLowerCase();
    }
    return false;
  });
}
*/

export default filterBySearchInput;
