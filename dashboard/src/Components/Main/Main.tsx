import React from "react";
import "./Main.scss";
import MapBoxComponent from "../MapBox/MapBox";
import SwitcherComponent from "../../components/Switcher/Switcher";
import Admin from "../Admin/Admin";
const MainLayoutComponent: React.FC<any> = () => {
  return (
    <div className="main-layout-component">
      <section className="section-left">
        <SwitcherComponent />
      </section>
      <div className="section-center">
        <section className="map-container">
          <MapBoxComponent />
        </section>
        <section className="section-bottom">
          <Admin />
        </section>
      </div>
    </div>
  );
};

export default MainLayoutComponent;
