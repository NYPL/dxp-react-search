const {
  NEXT_PUBLIC_GTM_TRACKING_ID,
  NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_SERVER_ENV,
} = process.env;
import Document, { Html, Head, Main, NextScript } from "next/document";

class ScoutDocument extends Document {
  render() {
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
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <script
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
          />
          {/* NYPL Header */}
          <script async src={nyplHeaderScript} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://assets.nypl.org/js/advocacy.js"></script>
        </body>
      </Html>
    );
  }
}

export default ScoutDocument;
