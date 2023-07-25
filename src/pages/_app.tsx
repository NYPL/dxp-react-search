import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = process.env;
import "./../styles/main.scss";
import AppLayout from "./../components/shared/layouts/AppLayout";
import Error from "./_error";

export default function ScoutApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // When next js routes change, send data to GA.
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Google Analytics: Virtual page view.
      window.gtag("config", NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      });

      // Adobe Analytics: Virtual page view.
      window.adobeDataLayer.push({
        page_name: null,
        site_section: null,
      });
      const pageName = document.title.split("|")[0].trim();
      window.adobeDataLayer.push({
        event: "virtual_page_view",
        page_name: pageName,
        site_section: null,
      });
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
