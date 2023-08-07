type MappingTableItem = {
  input: `/${string}`;
  siteSection: string;
  method: "exactMatch" | "startsWith";
};

// An array of bundles that should use bundle method.
const bundles = ["section_front"];

// Lookup tables of bundle types and their site section names.
const bundlesMap: Record<string, string> = {
  section_front: "Section Front",
};

// Mapping table for exact match or starts with matches.
const mappingTable: MappingTableItem[] = [
  {
    input: "/",
    siteSection: "Home",
    method: "exactMatch",
  },
  {
    input: "/home",
    siteSection: "Home",
    method: "exactMatch",
  },
  {
    input: "/blog",
    siteSection: "Blog",
    method: "startsWith",
  },
  {
    input: "/locations",
    siteSection: "Locations",
    method: "startsWith",
  },
  {
    input: "/press",
    siteSection: "Press",
    method: "startsWith",
  },
  {
    input: "/research/collections/articles-databases",
    siteSection: "Articles and Databases",
    method: "startsWith",
  },
];

/**
 * Gets the site section for a route, either by slug or bundle.
 *
 * @param {string} slug - The pathname of the route.
 * @param {string} bundle - The Drupal bundle of the route.
 *
 * @return {string} siteSection - The site section for the route.
 */
export default function getSiteSection(
  slug: string,
  bundle?: string
): string | null {
  // If slug doesn't start with a /, return null.
  if (!slug.startsWith("/")) {
    return null;
  }

  // If bundle parameter is provided, we use that instead of the slug for resolving site section.
  if (bundle && bundles.includes(bundle)) {
    return bundlesMap[bundle];
  }

  // Resolve the site section via the mapping table configuration.
  return mappingTable.reduce((siteSection: string, item: MappingTableItem) => {
    if (item.method === "exactMatch" && item.input === slug) {
      siteSection = item.siteSection;
    }

    if (item.method === "startsWith" && slug.startsWith(item.input)) {
      siteSection = item.siteSection;
    }

    return siteSection;
  }, "");
}
