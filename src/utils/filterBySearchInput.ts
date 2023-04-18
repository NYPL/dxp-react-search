// @see https://github.com/NYPL/locations-app/blob/936bd5566631fa159135bd0966129527bad2506a/public/scripts/directives/nypl_directives.js

type Location = {
  name: string;
  slug: string;
  synonyms: string[];
};

// Helper function to clean text
function cleanText(text: string) {
  return text
    .replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "")
    .toLowerCase();
}

// Filter locations by search term.
// @TODO filter-locations-by-search-term.ts
export default function filterBySearchInput(
  locations: Location[],
  searchTerm: string
) {
  return locations.filter((location) => {
    // return locations.filter(function (location) {
    if (
      // Check for string match on location name.
      cleanText(location.name).indexOf(cleanText(searchTerm)) >= 0 ||
      // Check for synonyms match.
      location.synonyms.includes(cleanText(searchTerm))
    ) {
      return true;
    }

    // return (
    //   cleanText(location.name).indexOf(cleanText(searchTerm)) >= 0
    //   // @TODO add this back in for location finder!
    //   /*|| cleanText(location.locality).indexOf(cleanText(searchTerm)) >= 0
    //   || cleanText(location.postal_code).indexOf(cleanText(searchTerm)) >= 0
    //   */
    // );

    return false;
  });
}
