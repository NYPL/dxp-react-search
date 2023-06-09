const {
  NEXT_PUBLIC_GTM_TRACKING_ID,
  NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_SERVER_ENV,
  NEXT_PUBLIC_ADOBE_LAUNCH_URL,
} = process.env;
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

/** Using the <Script/> tag from Nextjs to optimize third-party scripts. According to the Docs Overview (https://nextjs.org/docs/basic-features/script#overview)
 * async is not a necessary attribute. You can add an optional strategy prop (https://nextjs.org/docs/api-reference/next/script#strategy)
 * to conrtol the loading behavior. If no strategy prop is passed, its default is 'afterInteractive'. This means it will load after some (or all) hydration occurs on the page.'
 */

export default function Document() {
  // Set PROD or QA version of the remote header embed script.
  // This will generate enviornment aware links in the header logins.
  let nyplHeaderScript =
    "https://header.nypl.org/dgx-header.min.js?skipNav=main-content&urls=absolute";
  if (NEXT_PUBLIC_SERVER_ENV !== "production") {
    nyplHeaderScript =
      "https://qa-header.nypl.org/dgx-header.min.js?skipNav=main-content&urls=absolute";
  }

  return (
    <Html lang="en">
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-tag-data-layer"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('require', '${NEXT_PUBLIC_GTM_TRACKING_ID}');
              gtag('config', '${NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                'groups':'default',
                'anonymize_ip':true
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
              let pageName = document.title.split("|")[0];
              let siteSection = null;
              if (window.location.pathname === "/") {
                pageName = "Home"
                siteSection = "Homepage"
              }
              window.adobeDataLayer.push({
                page_name: pageName,
                site_section: siteSection,
              });
            `,
          }}
        />
        {/* Adobe Analytics: Add launch tag manager script. */}
        <Script
          src={NEXT_PUBLIC_ADOBE_LAUNCH_URL}
          strategy="afterInteractive"
        />
        {/* NYPL Header */}
        <Script src={nyplHeaderScript} strategy="beforeInteractive" />
      </Head>
      <body>
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
