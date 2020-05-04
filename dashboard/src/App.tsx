import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import MainLayoutComponent from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ComingSoonComponent from "./components/ComingSoon/ComingSoon";

const App: React.FC<any> = () => {
  const [showApp, setShowApp] = useState<boolean>(false);
  if (!showApp) {
    const query = window.location.href.split("?");
    if (query.length > 1) {
      const showQuery = query[1].split("=").length && query[1].split("=")[0];
      if (showQuery === "admin-user") {
        setShowApp(true);
      }
    }
  }
  return (
    <div className="app-wrapper">
      {showApp ? (
        <>
          <MainLayoutComponent />
          <Footer />
        </>
      ) : (
        <ComingSoonComponent />
      )}
    </div>
  );
};
export default App;
