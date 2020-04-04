import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/NavBar";
import MapView from "./components/mapview/MapView";
import Trajectory from "./components/trajectory/Trajectory";
import News from "./components/news/News";
import Zone from "./components/zone/zone";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={MapView} />
          <Route exact path="/trajectory" component={Trajectory} />
          <Route exact path="/trajectory" component={News} />
          <Route exact path="/trajectory" component={Zone} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
