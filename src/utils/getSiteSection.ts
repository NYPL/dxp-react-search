export default function getSiteSection(
  url: string,
  bundle: string | undefined
): string {
  if (window.location.pathname === "/") {
    return "Homepage";
  }

  const firstSlug = url.replace(/[0-9]/g, "").split("/")[1];
  const defaultSiteSection =
    firstSlug.charAt(0).toUpperCase() + firstSlug.slice(1);

  if (url.match(/^(\/research\/collections\/articles-databases)/))
    return "Articles and Databases";

  if (bundle === "section_front") return "Section Front";

  return defaultSiteSection;
}
