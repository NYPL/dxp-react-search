const { NEXT_PUBLIC_GTM_TRACKING_ID } = process.env;
const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;
import Document, { Html, Head, Main, NextScript } from "next/document";

class ScoutDocument extends Document {
  render() {
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
          <script
            async
            src="https://header.nypl.org/dgx-header.min.js?skipNav=main-content&urls=absolute"
          />
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
