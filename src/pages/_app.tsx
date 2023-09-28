import * as React from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "./../styles/main.scss";
import AppLayout from "./../components/shared/layouts/AppLayout";
import Error from "./_error";
// Analytics.
const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = process.env;
import trackAdobeVirtualPageView from "../utils/track-adobe-virtual-page-view";

export default function ScoutApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Adobe Analytics: trigger an initial virtual page view on initial render.
  React.useEffect(() => {
    trackAdobeVirtualPageView(router.asPath, pageProps.bundle);
  }, []);

  // When next js routes change, send data to GA4 and Adobe Analytics.
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Google Analytics: Virtual page view.
      window.gtag("config", NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      });

      // Adobe Analytics: Virtual page view.
      trackAdobeVirtualPageView(router.asPath, pageProps.bundle);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // Handle errors.
  if (pageProps.errorCode) {
    return (
      <AppLayout>
        <Error statusCode={pageProps.errorCode} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
