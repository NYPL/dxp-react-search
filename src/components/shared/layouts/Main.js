//import Header from './../Header/Header';
import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';

export default ({ children }) => (
  <div>
    <Header
      skipNav={{ target: 'main-content' }}
      navData={navConfig.current}
    />
    <main>
      {children}
    </main>
    <Footer
      id="footer"
      className="footer"
    />
  </div>
);
