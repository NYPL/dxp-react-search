import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;
import "./../styles/main.scss";
import AppLayout from "./../components/shared/layouts/AppLayout";
import Error from "./_error";

interface ScoutAppProps {
  errorCode?: number;
}

export default function ScoutApp({
  Component,
  pageProps,
}: AppProps<ScoutAppProps>) {
  const router = useRouter();
  // When next js routes change, send data to GA.
  useEffect(() => {
    const handleRouteChange = (url: string) => {
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
