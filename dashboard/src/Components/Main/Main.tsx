import React, { useState, useEffect } from "react";
import "./Main.scss";
import MapBoxComponent from "../MapBox/MapBox";
import SwitcherComponent from "../../components/Switcher/Switcher";
import Admin from "../admin/Admin";
import LocalStatsComponent from "../LocalStats/LocalStats";
import GlobalStatsComponent from "../GlobalStats/GlobalStats";
const MainLayoutComponent: React.FC<any> = () => {
  const [globalStats, setGlobalStats] = useState<boolean>(false);

  useEffect(() => {
    console.log("Flag value updated:  ", globalStats);
  }, [globalStats]);

  return (
    <div className="main-layout-component">
      <section className="section-left">
        <SwitcherComponent
          switcherLabel="Show Global Stats"
          flag={globalStats}
          stateHandler={setGlobalStats}
        />
        {globalStats ? <GlobalStatsComponent /> : <LocalStatsComponent />}
      </section>
      <div className="section-center">
        <section className="map-container">
          <MapBoxComponent />
        </section>
        <section className="section-bottom">
          <Admin />
          {/* To Do Fix styles; make it more presentable @usama */}
        </section>
      </div>
    </div>
  );
};

export default MainLayoutComponent;
