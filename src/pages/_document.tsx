const {
  // NEXT_PUBLIC_GTM_TRACKING_ID,
  // NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_ADOBE_LAUNCH_URL,
  NEXT_PUBLIC_SERVER_ENV,
} = process.env;
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

/** Using the <Script/> tag from Nextjs to optimize third-party scripts. According to the Docs Overview (https://nextjs.org/docs/basic-features/script#overview)
 * async is not a necessary attribute. You can add an optional strategy prop (https://nextjs.org/docs/api-reference/next/script#strategy)
 * to conrtol the loading behavior. If no strategy prop is passed, its default is 'afterInteractive'. This means it will load after some (or all) hydration occurs on the page.'
 */

export default function Document() {
  const GA_MEASUREMENT_ID = "G-VEXBPRSL67";
  // Set PROD or QA version of the remote header embed script.
  // This will generate enviornment aware links in the header logins.
  let nyplHeaderScript =
    "https://ds-header.nypl.org/header.min.js?containerId=nypl-header";
  let nyplFooterScript =
    "https://ds-header.nypl.org/footer.min.js?containerId=nypl-footer";
  if (NEXT_PUBLIC_SERVER_ENV !== "production") {
    nyplHeaderScript =
      "https://qa-ds-header.nypl.org/header.min.js?containerId=nypl-header";
    nyplFooterScript =
      "https://qa-ds-header.nypl.org/footer.min.js?containerId=nypl-footer";
  }

  return (
    <Html lang="en">
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-data-layer"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
          strategy="afterInteractive"
        />

        {/* Adobe Analytics: Initial data layer definition. */}
        <Script
          id="adobe-analytics-data-layer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.adobeDataLayer = [];
              let pageName = document.title.split("|")[0].trim();
              if (window.location.pathname === "/") {
                pageName = "Home"
              }
              window.adobeDataLayer.push({
                page_name: pageName,
                site_section: null,
              });
            `,
          }}
        />
        {/* Adobe Analytics: Add launch tag manager script. */}
        <Script
          src={NEXT_PUBLIC_ADOBE_LAUNCH_URL}
          strategy="afterInteractive"
        />
      </Head>
      <body>
        <Script src={nyplHeaderScript} strategy="afterInteractive" />
        <Script src={nyplFooterScript} strategy="afterInteractive" />
        <Main />
        <NextScript />
        <Script
          src="https://assets.nypl.org/js/advocacy.js"
          strategy="afterInteractive"
        />
      </body>
    </Html>
  );
}
