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

import { getAllCountriesData, getAllStatesData } from "../../shared/covid-data-api/api";

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

const world: Polygon = { name: "world", geojson: PolyWorld.default[0], color: "FF0000" }

const MapBoxComponent: React.FC<MapComponentProps> = ({ center }) => {
  const [covidData, setCovidData] = useState<any[]>([]);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [mapReady, setMapReady] = useState<boolean>(false);
  // const [context, setContext] = useState<any>();

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
    drawProvincePolygons();
    // drawCircle();
  }, [map]);

  // useEffect(() => {
  //   console.log("called");
    
  //   refreshStatesData();
  // }, [covidData]);

  const refreshCountriesData = () => {
    getAllCountriesData().then((data: any) => {
      if (data) {
        console.log(data);
        setCovidData(data);
      }
    });
  };

  // const refreshStatesData = () => {
  //   getAllStatesData().then((data: any) => {
  //     if (data) {
  //       console.log([...covidData, ...data]);
  //     }
  //   });
  // }

  const initMap = () => {
    let map = new mapboxgl.Map({
      accessToken: environment.mapBoxAccessToken,
      container: "map-gl-container",
      center,
      zoom: 4,
      style: MapStyles.Dark,
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

  const drawProvincePolygons = () => {
    provinces.forEach(province => {
      createPolygonLayer(province);
    });

    PolyWorld.default.forEach(country => {
      world.geojson = country;
      let filteredClasses = covidData.filter(ctr => country.properties.name.toLowerCase() === (ctr.country.toLowerCase()));
      if (!(filteredClasses === undefined || filteredClasses.length === 0)) {
        world.name = country.id;
        createPolygonLayer(world);
      }
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

  const drawCircle = () => {
    if (map) {
      const allPoints = covidData.map(country => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [country.countryInfo.long, country.countryInfo.lat]
        },
        properties: {
          key: country.countryInfo._id,
          name: country.country,
          address: country.country,
          confirmed: country.cases,
          deaths: country.deaths,
          recovered: country.recovered,
          total_cases: country.cases
        }
      }));
      map.addLayer({
        id: "circles",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: allPoints as any
          }
        },
        type: "circle",
        paint: {
          "circle-opacity": 0.75,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "total_cases"],
            1,
            4,
            1000,
            8,
            4000,
            10,
            8000,
            14,
            12000,
            18,
            100000,
            40,
            250000,
            100
          ],
          "circle-color": "#EA240F"
        }
      });
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      let previous_id: any;

      map.on("mousemove", "circles", e => {
        if (e && e.features && e.features[0] && e.features[0].properties) {
          const key = e.features[0].properties.key;
          if (key !== previous_id) {
            const {
              name,
              confirmed,
              deaths,
              recovered
            } = e.features[0].properties;
            map.getCanvas().style.cursor = "pointer";
            var coordinates: any;
            if (e.features[0].geometry.type === "Point") {
              coordinates = e.features[0].geometry.coordinates.slice();
            }
            const HTML = `
              <html> 
                <style type="text/css"> 
                  @import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto:ital,wght@0,400;0,500;1,300&display=swap'); 
                  .popup-body { font-family: 'Roboto', sans-serif; font-family: 'Lato', sans-serif; color: black;} 
                  .table-body {color:black;}
                  .header-title { font-family: 'Roboto', sans-serif; font-family: 'Lato', sans-serif; font-size: 15px; font-weight: bold; color: #000000; } 
                  .flex-container { height: 30px; display: flex; flex-wrap: nowrap; } 
                  .dot-container { width: 20px; height: 30px; display: flex; justify-content: center; align-items: center; } 
                  .title-container { width: 95px; height: 30px; display: flex; align-items: center;} 
                  .statistics-container { width: 80px; height: 30px; display: flex; justify-content: flex-end; align-items: center; } 
                  .confirmed-dot { width: 8px; height: 8px; border-radius: 50px; background-color: #DA1400; } 
                  .deaths-dot { width: 8px; height: 8px; border-radius: 50px; background-color: #525252; } 
                  .recovered-dot { width: 8px; height: 8px; border-radius: 50px; background-color: #3BD202; } 
                  .statistics-label { font-family: 'Roboto', sans-serif; font-size: 12px; } 
                  .statistics-count { font-family: 'Roboto', sans-serif; font-size: 12px; } 
                </style> 
                <body class="popup-body"> 
                  <table cellpadding=0 cellspacing=0 border="0" width="200" height="40">
                    <tr> 
                      <td align="center" "> 
                        <span class=" header-title ">${name}</span> 
                      </td> 
                    </tr> 
                  </table> 
                  <table cellpadding=0 cellspacing=0 border="0" width="200" height="90" class="table-body"> 
                    <tr> 
                      <td align="center" class="flex-container"> 
                        <div class="dot-container">
                          <div class="confirmed-dot"></div>
                        </div> 
                        <div class="title-container">
                          <span class="statistics-label">Confirmed</span>
                        </div> 
                        <div class="statistics-container">
                          <span class="statistics-count">${confirmed}</span>
                        </div> 
                      </td> 
                    </tr> 
                    <tr> 
                      <td align="center" class="flex-container"> 
                        <div class="dot-container">
                          <div class="deaths-dot"></div>
                        </div> 
                        <div class="title-container">
                          <span class="statistics-label">Deaths</span>
                        </div> 
                        <div class="statistics-container">
                          <span class="statistics-count">${deaths}</span>
                        </div> 
                      </td> 
                    </tr> 
                    <tr> 
                      <td align="center" class="flex-container"> 
                        <div class="dot-container">
                          <div class="recovered-dot"></div>
                        </div> 
                        <div class="title-container">
                          <span class="statistics-label">Recovered</span>
                        </div> 
                        <div class="statistics-container">
                          <span class="statistics-count">${recovered}</span>
                        </div> 
                      </td> 
                    </tr> 
                  </table> 
                </body> 
              </html>`;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup
              .setLngLat(coordinates)
              .setHTML(HTML)
              .addTo(map);
          }
        }
      });

      map.on("mouseleave", "circles", function() {
        previous_id = undefined;
        map.getCanvas().style.cursor = "";
        popup.remove();
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
      if (!map.getLayer("points")) {
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
      }
      if (map.getLayer("points")) {
        console.log("Layer Removed!");
        map.removeLayer("points");
      }
      if (map.getSource("point")) {
        console.log("Source Removed!");
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
