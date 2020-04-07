import React, { useEffect } from "react";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../shared/environment/environment";
import { MapStyles } from "./styles/styles";
import * as PolyPunjab from "../../geojson/punjab";
import * as PolyGB from "../../geojson/gb";
import * as PolyCapital from "../../geojson/capital";
import * as PolyKPK from "../../geojson/kpk";
import * as PolySindh from "../../geojson/sindh";
import * as PolyAJK from "../../geojson/ajk";
import * as PolyBalochistan from "../../geojson/balochistan";
import * as PolyFata from "../../geojson/fata";

const provinces: Polygon[] = [
  { name: "punjab", geojson: PolyPunjab.default, color: "029B5B" },
  { name: "kpk", geojson: PolyKPK.default, color: "02A24B" },
  { name: "sindh", geojson: PolySindh.default, color: "58E87D" },
  { name: "gilgit", geojson: PolyGB.default, color: "58E861" },
  { name: "capital", geojson: PolyCapital.default, color: "7FE858" },
  { name: "ajk", geojson: PolyAJK.default, color: "95E858" },
  { name: "balochistan", geojson: PolyBalochistan.default, color: "A7E858" },
  { name: "fata", geojson: PolyFata.default, color: "BFE858" }
];
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

    map.on("load", () => drawProvincePolygons());
  };
  const drawProvincePolygons = () => {
    provinces.forEach(province => {
      createPolygonLayer(province);
    });
  };

  const createPolygonLayer = (config: Polygon) => {
    map.addSource(config.name, {
      type: "geojson",
      data: config.geojson as any
    });
    map.addLayer({
      id: config.name,
      type: "fill",
      source: config.name,
      layout: {},
      paint: {
        "fill-color": `#${config.color}`,
        "fill-opacity": 0.5
      }
    });
  };
  return (
    <div
      className="mapbox-gl-component-wrapper"
      style={{ height: "calc(100vh - 52px)" }}
    >
      <div id="map-gl-container" style={{ height: "100%" }}></div>
    </div>
  );
};
type Polygon = {
  name: string;
  geojson: Object;
  color: string;
};
export default MapBoxComponent;
