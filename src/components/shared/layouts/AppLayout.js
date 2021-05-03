import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';

function AppLayout({ children }) {
  return (
    <div className="layout-container">
      <Header
        skipNav={{ target: 'main-content' }}
        navData={navConfig.current}
      />
        {children}
      <Footer
        id="footer"
        className="footer"
      />
    </div>
  );
}

export default AppLayout;
