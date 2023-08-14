import getSiteSection from "./get-site-section";

export default function submitAdobePageView(path: string, bundle: string) {
  // Remove query parameters from path
  const slug = path.replace(/\?.+/, "");
  window.adobeDataLayer.push({
    page_name: null,
    site_section: null,
  });

  const pageName = path.replace(/^\//g, "nypl|").replace(/\//g, "|");

  const siteSection = getSiteSection(slug, bundle);

  window.adobeDataLayer.push({
    event: "virtual_page_view",
    page_name: pageName,
    site_section: siteSection,
  });
}
