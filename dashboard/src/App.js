import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleMapReact from "google-map-react";
import googleMapConfig from "./shared/googleMap.config";

function App() {
  const mapConfig = {
    center: {
      lat: 30.3753,
      lng: 69.3451
    },
    zoom: 6
  };
  return (
    <div className="App">
      <h2 className="title">Dashboard</h2>
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapConfig.apiKey }}
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
        ></GoogleMapReact>
      </div>
    </div>
  );
}
export default App;
