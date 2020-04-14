import React, { useEffect, useState } from "react";
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
import "./MapBox.scss";

interface MapComponentProps {
  center: mapboxgl.LngLat;
}

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
const MapBoxComponent: React.FC<MapComponentProps> = ({ center }) => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [mapReady, setMapReady] = useState<boolean>(false);

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: center,
        essential: true
      });
    }
  }, [center]);

  useEffect(() => {
    drawProvincePolygons();
  }, [map]);

  const initMap = () => {
    let map = new mapboxgl.Map({
      accessToken: environment.mapBoxAccessToken,
      container: "map-gl-container",
      center,
      zoom: 4,
      style: MapStyles.Dark,
      boxZoom: true
    });
    map.on("load", () => {
      setMap(map);
      setMapReady(true);
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );

      map.addControl(new mapboxgl.NavigationControl());
    });
  };

  const drawProvincePolygons = () => {
    provinces.forEach(province => {
      createPolygonLayer(province);
    });
  };

  const createPolygonLayer = (config: Polygon) => {
    if (map) {
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
    }
  };

  return (
    <div className="mapbox-gl-component-wrapper">
      <div id="map-gl-container" style={{ height: "100%" }}></div>
      {mapReady && <div className="map-controls"></div>}
    </div>
  );
};

type Polygon = {
  name: string;
  geojson: Object;
  color: string;
};

type NavigatorResponse = {
  coords: any;
};
export default MapBoxComponent;
