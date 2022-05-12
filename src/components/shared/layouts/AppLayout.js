//import { Header, navConfig } from "@nypl/dgx-header-component";
import Footer from "@nypl/dgx-react-footer";
import StaticHeader from "./StaticHeader";

function AppLayout({ children }) {
  return (
    <div className="layout-container">
      {/* <Header
        skipNav={{ target: "main-content" }}
        navData={navConfig.current}
      /> */}
      <StaticHeader />
      {/* <div id="Header-Placeholder" style={{ minHeight: "273px" }}>
        <script
          type="text/javascript"
          src="https://header.nypl.org/dgx-header.min.js?skipNav=main-content&urls=absolute"
          async
        />
      </div> */}
      {children}
      <Footer id="footer" className="footer" />
    </div>
  );
}

export default AppLayout;
