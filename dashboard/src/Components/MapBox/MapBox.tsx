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
import * as Circle from "./circle";
import "./MapBox.scss";

import * as PolyWorld from "../Main/world";

import {
  getAllCountriesData,
  getAllStatesData
} from "../../shared/covid-data-api/api";
import { AppState } from "../../interfaces/meta";
import { connect, ConnectedProps } from "react-redux";

interface MapComponentProps extends PropsFromRedux {}

const provinces: Polygon[] = [
  {
    name: "punjab",
    geojson: PolyPunjab.default,
    color: "#029B5B",
    opacity: 0.5
  },
  { name: "kpk", geojson: PolyKPK.default, color: "#02A24B", opacity: 0.5 },
  {
    name: "sindh",
    geojson: PolySindh.default,
    color: "#58E87D",
    opacity: 0.5
  },
  { name: "gilgit", geojson: PolyGB.default, color: "#58E861", opacity: 0.5 },
  {
    name: "capital",
    geojson: PolyCapital.default,
    color: "#7FE858",
    opacity: 0.5
  },
  { name: "ajk", geojson: PolyAJK.default, color: "#95E858", opacity: 0.5 },
  {
    name: "balochistan",
    geojson: PolyBalochistan.default,
    color: "#A7E858",
    opacity: 0.5
  },
  { name: "fata", geojson: PolyFata.default, color: "#BFE858", opacity: 0.5 }
];

enum ZoneColorMap {
  HighZone = "rgba(143, 11, 125, 0.85)",
  ModerateZone = "rgba(143, 11, 125, 0.75)",
  LowZone = "rgba(143, 11, 125, 0.7)",
  ZeroZone = "rgba(143, 11, 125, 0.5)"
}

const world: Polygon = {
  name: "world",
  geojson: PolyWorld.default[0],
  color: "rgba(255, 0, 0, 0.9)",
  opacity: 0.5
};

const MapBoxComponent: React.FC<MapComponentProps> = ({ center }) => {
  const [covidData, setCovidData] = useState<any[]>([]);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [zonesReady, setZonesReady] = useState<boolean>(false);

  useEffect(() => {
    initMap();
    refreshCountriesData();
  }, []);

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: center,
        essential: true
      });
      drawPulsingDot();
    }
  }, [center]);

  useEffect(() => {
    // drawProvincialPolygons();
    map && !zonesReady && drawGlobalZones();
  }, [map]);

  useEffect(() => {
    map && !zonesReady && drawGlobalZones();
    refreshStatesData();
  }, [covidData]);

  const refreshCountriesData = () => {
    console.time("api");
    getAllCountriesData().then((data: any) => {
      console.timeEnd("api");
      if (data) {
        setCovidData(data);
      }
    });
  };

  const refreshStatesData = () => {
    getAllStatesData().then((data: any) => {});
  };

  const initMap = () => {
    let map = new mapboxgl.Map({
      accessToken: environment.mapBoxAccessToken,
      container: "map-gl-container",
      center,
      zoom: 3,
      style: MapStyles.Light,
      boxZoom: true
    });
    map.once("load", () => {
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

  const drawGlobalZones = () => {
    if (covidData.length) {
      console.time("Rendering Zones");
      PolyWorld.default.forEach(countryPolygon => {
        const correspondingData = covidData.find(
          ctry =>
            ctry.country.toLowerCase() ===
            countryPolygon.properties.name.toLowerCase()
        );
        correspondingData
          ? drawZone(correspondingData, countryPolygon)
          : drawZone(
              { country: countryPolygon.properties.name },
              countryPolygon
            );
      });
      console.timeEnd("Rendering Zones");
      setZonesReady(true);
    }
  };

  const drawZone = (countryData: any, geojson: any) => {
    let color = ZoneColorMap.ZeroZone;
    if (countryData.cases <= 10000) {
      color = ZoneColorMap.LowZone;
    } else if (countryData.cases > 10000 && countryData.cases < 100000) {
      color = ZoneColorMap.ModerateZone;
    } else if (countryData.cases >= 100000) {
      color = ZoneColorMap.HighZone;
    }
    createPolygonLayer({
      name: countryData.country,
      geojson,
      color,
      opacity: 0.75
    });
  };

  const drawProvincialPolygons = () => {
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
          "fill-color": config.color,
          "fill-opacity": config.opacity
        }
      });
    }
  };

  const drawPulsingDot = () => {
    if (map) {
      var context: any;
      let size = 100;
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function() {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          context = canvas.getContext("2d");
        },

        // called once before every frame where the icon will be used
        render: function() {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
          this.data = context.getImageData(0, 0, this.width, this.height).data;
          if (map) {
            map.triggerRepaint();
          }
          return true;
        }
      };
      if (!map.getLayer("points")) {
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
      }
      if (map.getLayer("points")) {
        // console.log("Layer Removed!");
        map.removeLayer("points");
      }
      if (map.getSource("point")) {
        // console.log("Source Removed!");
        map.removeSource("point");
      }
      Circle.default.features[0].geometry.coordinates = [
        center.lng,
        center.lat
      ];
      map.addSource("point", {
        type: "geojson",
        data: Circle.default as any
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": "pulsing-dot"
        }
      });
    }
  };

  return (
    <div className="mapbox-gl-component-wrapper">
      <div id="map-gl-container" style={{ height: "100%" }}></div>
      {mapReady && (
        <div className="map-controls">
          <div className="zones-legend">
            <div className="zone-block">
              <div className="zone-color zone-color--zero"></div>
              <h4 className="zone-label">Zero</h4>
            </div>
            <div className="zone-block">
              <div className="zone-color zone-color--low"></div>
              <h4 className="zone-label">Low</h4>
            </div>
            <div className="zone-block">
              <div className="zone-color zone-color--medium"></div>
              <h4 className="zone-label">Medium</h4>
            </div>
            <div className="zone-block">
              <div className="zone-color zone-color--high"></div>
              <h4 className="zone-label">High</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type Polygon = {
  name: string;
  geojson: Object;
  color: string;
  opacity: number;
};

type NavigatorResponse = {
  coords: any;
};

const mapStateToProps = (state: AppState) => {
  return {
    center: state.mapCenter
  };
};
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(MapBoxComponent);
