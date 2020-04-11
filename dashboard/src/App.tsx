import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import MainLayoutComponent from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

const App: React.FC<any> = () => {
  return (
    <div className="app-wrapper">
      <MainLayoutComponent />
      <Footer />
    </div>
  );
};
export default App;
