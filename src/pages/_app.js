import './../styles/main.scss';
import AppLayout from './../components/shared/layouts/AppLayout';

function SearchApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default SearchApp;