import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;
import "./../styles/main.scss";
import AppLayout from "./../components/shared/layouts/AppLayout";
import Error from "./_error";
import getSiteSection from "../utils/getSiteSection";

export default function ScoutApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const submitAdobePageView = (
    title: string,
    pathname: string,
    bundle: string
  ) => {
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
  };

  // Adobe Analytics: Virtual page view.
  useEffect(() => {
    submitAdobePageView(
      document.title,
      window.location.pathname,
      pageProps.bundle
    );
  }, []);

  // When next js routes change, send data to GA/ AA.
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Google Analytics: Virtual page view.
      window.gtag("config", NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: url,
      });

      submitAdobePageView(
        document.title,
        window.location.pathname,
        pageProps.bundle
      );
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
