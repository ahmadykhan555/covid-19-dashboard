import React, { useEffect } from "react";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../shared/environment/environment";
import { MapStyles } from "./styles/styles";
const MapBoxComponent: React.FC<any> = () => {
  useEffect(() => {
    initMap();
  });

  let map: mapboxgl.Map;

  const initMap = () => {
    map = new mapboxgl.Map({
      accessToken: environment.mapBoxAccessToken,
      container: "map-gl-container",
      center: [69.3451, 30.3753],
      zoom: 5,
      style: MapStyles.Dark
    });

    map.on("load", () => {
      drawProvincePolygons();
    });
  };
  const drawProvincePolygons = () => {};
  return (
    <div className="mapbox-gl-component-wrapper" style={{ height: "100%" }}>
      <div id="map-gl-container" style={{ height: "100%" }}></div>
    </div>
  );
};

export default MapBoxComponent;
