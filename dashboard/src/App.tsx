import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import MainLayoutComponent from "./components/Main/Main";

const App: React.FC<any> = () => {
  return (
    <div className="app-wrapper">
      <MainLayoutComponent />
    </div>
  );
};
export default App;
