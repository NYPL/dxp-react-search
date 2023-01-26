// Content + config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
// Type
import { BreadcrumbsItem } from "./../components/shared/layouts/PageContainer";

const breadcrumbsTextTable: Record<string, string> = {
  give: "Give",
  research: "Research",
  support: "Support and Services",
  collections: "Collections",
};

export default function getBreadcrumbsTrail(
  slug: string | undefined | null
): BreadcrumbsItem[] {
  // Early return if the slug is empty in any way
  if (slug === "" || slug === undefined || slug === null) return [];
  // Clean slug from any extra slashes and parammeters
  const breadcrumbsArray = slug
    .replace(/^\//, "")
    .replace(/\?.*/, "")
    .split("/");
  //If there is only one
  if (breadcrumbsArray.length === 1) {
    return [
      {
        text: breadcrumbsTextTable[breadcrumbsArray[0]],
        url: `${NEXT_PUBLIC_NYPL_DOMAIN}/${breadcrumbsArray[0]}`,
      },
    ];
  }
  const breadcrumbsTrail = breadcrumbsArray.map((item, index) => {
    let url = `${NEXT_PUBLIC_NYPL_DOMAIN}`;

    breadcrumbsArray.forEach((__, i) => {
      if (i <= index) {
        url = url + `/${breadcrumbsArray[i]}`;
      }
    });

    return {
      text: breadcrumbsTextTable[item],
      url: `${url}`,
    };
  });

  return breadcrumbsTrail;
}
