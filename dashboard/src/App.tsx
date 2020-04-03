import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import MapView from "./components/MapView/mapview";
import Trajectory from "./components/Trajectory/trajectory";
import News from "./components/News/news";
import Zone from "./components/Zone/zone";

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
