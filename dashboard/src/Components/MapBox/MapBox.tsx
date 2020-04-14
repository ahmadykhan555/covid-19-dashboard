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
  // const [context, setContext] = useState<any>();

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
    drawCircles();
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

  const drawCircles = () => {
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

          // update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // continuously repaint the map, resulting in the smooth animation of the dot
          if (map) {
            map.triggerRepaint();
          }

          // return `true` to let the map know that the image was updated
          return true;
        }
      };
      map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
      map.addSource("points", {
        type: "geojson",
        data: Circle.default as any
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "pulsing-dot"
        }
      });
    }
  };

  const changeMapType = (type: MapStyles) => {
    if (map) {
      map.setStyle(type);
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
