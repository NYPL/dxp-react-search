import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;
import "./../styles/main.scss";
import AppLayout from "./../components/shared/layouts/AppLayout";
import Error from "./_error";

export default function ScoutApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // When next js routes change, send data to GA.
  useEffect(() => {
    // @ts-ignore
    const handleRouteChange = (url) => {
      // @ts-ignore
      window.gtag("config", NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Handle errors.
  // @ts-ignore
  if (pageProps.errorCode) {
    return (
      <AppLayout>
        {/* @ts-ignore */}
        <Error statusCode={pageProps.errorCode} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </AppLayout>
  );
}
