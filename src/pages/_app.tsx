import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = process.env;
import "./../styles/main.scss";
import AppLayout from "./../components/shared/layouts/AppLayout";
import Error from "./_error";
import submitAdobePageView from "../utils/submit-adobe-page-view";

export default function ScoutApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Adobe Analytics: trigger an initial virtual page view.
  useEffect(() => {
    submitAdobePageView(router.asPath, pageProps.bundle);
  }, []);

  // When next js routes change, send data to GA/ AA.
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Google Analytics: Virtual page view.
      window.gtag("config", NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      });

      // Adobe Analytics: Virtual page view.
      submitAdobePageView(router.asPath, pageProps.bundle);
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
