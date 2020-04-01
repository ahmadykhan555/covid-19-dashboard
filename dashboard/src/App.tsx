import React, { useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCountriesData } from "./shared/covid-data-api/api";
import { resolveLocationByIp } from "./shared/ip-resolver/api";
const App: React.FC<any> = () => {
  const defaultMapCenter = new google.maps.LatLng(30.3753, 69.3451);
  let map: google.maps.Map;
  let mapBounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

  // hooks
  useEffect(() => {
    getAllCountriesData().then(res => {});
    resolveLocationByIp().then((res: any) => {
      if (res.data) {
        map
          ? updateMap(
              new google.maps.LatLng(res.data.latitude, res.data.longitude)
            )
          : initMap();
      }
    });
    initMap();
  }, []);

  // helpers
  const initMap = () => {
    const ele = document.getElementById("map-container");
    if (ele) {
      map = new google.maps.Map(ele, {
        center: defaultMapCenter,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoomControl: false,
        fullscreenControl: false
      });
    }
  };

  const updateMap = (coordinates: google.maps.LatLng) => {
    updateMapCenter(coordinates);
    drawUserLocationCircle(coordinates);
  };
  const updateMapCenter = (coordinates: google.maps.LatLng) => {
    map.setCenter(coordinates);
  };

  const drawUserLocationCircle = (center: google.maps.LatLng) => {
    const userLocationCircle = new google.maps.Circle({
      strokeColor: "#33FCA7",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#A7FAD7",
      fillOpacity: 0.5,
      center: center,
      map: map,
      radius: 1000
    });
    mapBounds.union(userLocationCircle.getBounds());
    map.fitBounds(mapBounds);
  };

  return (
    <div className="App">
      <h2 className="title">Dashboard</h2>
      <div id="map-container"></div>
    </div>
  );
};
export default App;
