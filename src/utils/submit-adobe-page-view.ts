import getSiteSection from "./get-site-section";

export default function submitAdobePageView(
  title: string,
  pathname: string,
  bundle: string
) {
  window.adobeDataLayer.push({
    page_name: null,
    site_section: null,
  });

  const pageName =
    title === "The New York Public Library" ? "Home" : title.split("|")[0];

  const siteSection = getSiteSection(pathname, bundle);

  window.adobeDataLayer.push({
    event: "virtual_page_view",
    page_name: pageName,
    site_section: siteSection,
  });
}
