import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/NavBar";
import Trajectory from "./components/trajectory/Trajectory";
import News from "./components/news/News";
import Zone from "./components/zone/Zone";
import Admin from "./components/admin/Admin";

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
          <Route exact path="/trajectory" component={Trajectory} />
          <Route exact path="/trajectory" component={News} />
          <Route exact path="/trajectory" component={Zone} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
