import { Header, navConfig } from '@nypl/dgx-header-component';
import * as DS from '@nypl/design-system-react-components';
import Footer from '@nypl/dgx-react-footer';

export default ({ children }) => (
  <div className="layout-container nypl--locations nypl-ds">
    <Header
      skipNav={{ target: 'main-content' }}
      navData={navConfig.current}
    />
    <DS.Breadcrumbs
      breadcrumbs={[
        {
          text: 'Home',
          url: 'https://www.nypl.org/'
        }
      ]}
    />
    <main className="main">
      {children}
    </main>
    <Footer
      id="footer"
      className="footer"
    />
  </div>
);
