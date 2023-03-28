const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { BreadcrumbsItem } from "./../components/shared/layouts/PageContainer";

// This converts a slug part string to the text value of the breadcrumb item.
const breadcrumbsTextTable: Record<string, string> = {
  give: "Give",
  research: "Research",
  support: "Support and Services",
  collections: "Collections",
  education: "Education",
  educators: "Educators",
  // For testing purposes now, replace with an actual 3rd level item when knwown.
  "level-3": "Level 3",
};

export default function getBreadcrumbsTrail(slug: string): BreadcrumbsItem[] {
  // Convert the slug from a string to an array, and any extra slashes.
  const breadcrumbsArray = slug
    .replace(/^\//, "")
    .replace(/\?.*/, "")
    .split("/");

  const breadcrumbsTrail = breadcrumbsArray.map((_, index) => {
    // @TODO add commen on what this block of code does and why.
    // [ 'research', 'support' ] -> "/research" or "/research/support"
    let url = `${NEXT_PUBLIC_NYPL_DOMAIN}`;
    breadcrumbsArray.forEach((__, i) => {
      if (i <= index) {
        url = url + `/${breadcrumbsArray[i]}`;
      }
    });

    return {
      text: breadcrumbsTextTable[breadcrumbsArray[index]],
      url: `${url}`,
    };
  });

  return breadcrumbsTrail;
}
