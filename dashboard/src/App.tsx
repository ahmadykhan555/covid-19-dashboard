import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/NavBar/NavBar";
import MapView from "./components/MapView/MapView";
import Trajectory from "./components/Trajectory/Trajectory";
import News from "./components/News/News";
import Zone from "./components/Zone/Zone";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import MapBoxComponent from "./components/MapBox/MapBox";

const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={MapView} />
          <Route exact path="/gl" component={MapBoxComponent} />
          <Route exact path="/trajectory" component={Trajectory} />
          <Route exact path="/trajectory" component={News} />
          <Route exact path="/trajectory" component={Zone} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
