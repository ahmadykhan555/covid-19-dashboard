import React, { useState, useEffect } from "react";
import "./Main.scss";
import MapBoxComponent from "../MapBox/MapBox";
import * as mapboxgl from "mapbox-gl";

import LocalStatsComponent from "../LocalStats/LocalStats";
import SummaryComponent from "../SummaryComponent/SummaryComponent";
import moment from "moment";
import GlobalStatsComponent from "../GlobalStats/GlobalStats";
const MainLayoutComponent: React.FC<any> = () => {
  const [globalStats, setGlobalStats] = useState<boolean>(true);
  const [mapCenter, setMapCenter] = useState<mapboxgl.LngLat>(
    new mapboxgl.LngLat(-97, 38)
  );

  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    globalStats
      ? setMapCenter(new mapboxgl.LngLat(-97, 38))
      : setMapCenter(new mapboxgl.LngLat(69.3451, 30.3753));
  }, [globalStats]);

  return (
    <div className="main-layout-component">
      <section className="section-left">
        <SummaryComponent
          switcherLabel={""}
          switcherStateHandler={setGlobalStats}
          switcherFlag={globalStats}
          entityName={selectedCountry ? selectedCountry.country : ""}
          recovered={selectedCountry.recovered}
          deaths={selectedCountry.deaths}
          cases={selectedCountry.cases}
          critical={selectedCountry.critical}
          flagSrc={selectedCountry ? selectedCountry.countryInfo.flag : ""}
        />
        {globalStats ? (
          <GlobalStatsComponent
            mapCenterSetter={setMapCenter}
            lastUpdatedSetter={setLastUpdated}
            selectedCountrySetter={setSelectedCountry}
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
