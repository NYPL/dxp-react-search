// @see https://github.com/NYPL/items-app/blob/936bd5566631fa159135bd0966129527bad2506a/public/scripts/directives/nypl_directives.js

export type FilterableItem = {
  id: string;
  name: string;
  synonyms?: string[];
};

// Helper function to sanitize a string, and remove all special characters.
function sanitizeText(text: string) {
  return text
    .replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "")
    .toLowerCase();
}

/*
 * Filter function to return items that match the search query.
 */
export default function filterBySearchQuery(
  items: FilterableItem[],
  searchQuery: string
): Record<string, any>[] {
  const searchQueryFinal = sanitizeText(searchQuery);

  return items.filter((item) => {
    // Check for string match on item name.
    if (sanitizeText(item.name).indexOf(searchQueryFinal) >= 0) {
      return true;
    }
    // Check for synonyms match, only used for location finder.
    if (item.synonyms && item.synonyms.includes(searchQueryFinal)) {
      return true;
    }
    return false;
  });
}
