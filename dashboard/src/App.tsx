import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/NavBar/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import MapBoxComponent from "./components/MapBox/MapBox";

const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={MapBoxComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
