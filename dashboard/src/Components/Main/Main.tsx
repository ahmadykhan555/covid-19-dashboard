import React, { useState, useEffect } from "react";
import "./Main.scss";
import MapBoxComponent from "../MapBox/MapBox";
import SwitcherComponent from "../../components/Switcher/Switcher";
import * as mapboxgl from "mapbox-gl";

import LocalStatsComponent from "../LocalStats/LocalStats";
import GlobalStatsComponent from "../GlobalStats/GlobalStats";
import SummaryComponent from "../SummaryComponent/SummaryComponent";
import moment from "moment";
const MainLayoutComponent: React.FC<any> = () => {
  const [globalStats, setGlobalStats] = useState<boolean>(true);
  const [mapCenter, setMapCenter] = useState<mapboxgl.LngLat>(
    new mapboxgl.LngLat(0, 0)
  );
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Flag value updated:  ", globalStats);
    globalStats
      ? setMapCenter(new mapboxgl.LngLat(121.0214, 14.5617))
      : setMapCenter(new mapboxgl.LngLat(69.3451, 30.3753));
  }, [globalStats]);

  return (
    <div className="main-layout-component">
      <section className="section-left">
        <SummaryComponent
          switcherLabel={""}
          stateHandler={setGlobalStats}
          flag={globalStats}
          entityName="Pakistan"
          recovered={10}
          deaths={10}
          cases={200}
          critical={150}
          flagSrc={
            "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/us.png"
          }
        />
        {globalStats ? (
          <GlobalStatsComponent
            mapCenterSetter={setMapCenter}
            lastUpdatedSetter={setLastUpdated}
          />
        ) : (
          <LocalStatsComponent />
        )}
      </section>
      <div className="section-center">
        <section className="map-container">
          <MapBoxComponent center={mapCenter} />
        </section>
      </div>
    </div>
  );
};

export default MainLayoutComponent;
