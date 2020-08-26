// @TODO Might not need this file?
const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  })
}
