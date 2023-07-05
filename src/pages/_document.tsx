const {
  NEXT_PUBLIC_GTM_TRACKING_ID,
  NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_ADOBE_LAUNCH_URL,
  DS_GLOBAL_HEADER,
  DS_GLOBAL_FOOTER,
} = process.env;
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

/** Using the <Script/> tag from Nextjs to optimize third-party scripts. According to the Docs Overview (https://nextjs.org/docs/basic-features/script#overview)
 * async is not a necessary attribute. You can add an optional strategy prop (https://nextjs.org/docs/api-reference/next/script#strategy)
 * to conrtol the loading behavior. If no strategy prop is passed, its default is 'afterInteractive'. This means it will load after some (or all) hydration occurs on the page.'
 */

export default function Document() {
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
        <div id="nypl-header"></div>
        <Script src={DS_GLOBAL_HEADER} strategy="afterInteractive" />
        <Main />
        <NextScript />
        <Script
          src="https://assets.nypl.org/js/advocacy.js"
          strategy="afterInteractive"
        />
        <div id="nypl-footer"></div>
        <Script
          type="module"
          src={DS_GLOBAL_FOOTER}
          strategy="afterInteractive"
        />
      </body>
    </Html>
  );
}
