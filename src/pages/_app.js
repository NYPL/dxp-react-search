import { useEffect } from 'react';
import { useRouter } from 'next/router';
const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;
import './../styles/main.scss';
import AppLayout from './../components/shared/layouts/AppLayout';

function SearchApp({ Component, pageProps }) {
  const router = useRouter();
  // When next js routes change, send data to GA.
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: url,
      });
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default SearchApp;