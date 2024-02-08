import getSiteSection from "./get-site-section";

export default function trackAdobeVirtualPageView(
  path: string,
  bundle: string
) {
  // Initialize empty data layer object.
  window.adobeDataLayer.push({
    page_name: null,
    site_section: null,
  });

  // Prefix path with `nypl|` and convert / to | in url path, i.e, /blog/post-1 -> nypl|blog|post-1.
  const pageName = path.replace(/^\//g, "nypl|").replace(/\//g, "|");

  // Remove query parameters from slug, for sending it to getSiteSection().
  const slug = path.replace(/\?.+/, "");
  // Get the site section from either the slug or the entity bundle.
  const siteSection = getSiteSection(slug, bundle);

  window.adobeDataLayer.push({
    event: "virtual_page_view",
    page_name: pageName,
    site_section: siteSection,
  });
}
