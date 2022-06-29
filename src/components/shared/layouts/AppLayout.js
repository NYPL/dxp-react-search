import NyplHeaderStatic from "./../NyplHeaderStatic";
import Footer from "@nypl/dgx-react-footer";

function AppLayout({ children }) {
  return (
    <div className="layout-container">
      <NyplHeaderStatic />
      {children}
      <Footer id="footer" className="footer" />
    </div>
  );
}

export default AppLayout;
