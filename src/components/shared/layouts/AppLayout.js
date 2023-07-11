function AppLayout({ children }) {
  return (
    <>
      <div id="nypl-header" />
      <div className="layout-container">{children}</div>
      <div id="nypl-footer" />
    </>
  );
}

export default AppLayout;
