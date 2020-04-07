import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/NavBar/NavBar";
import Admin from "./components/Admin/Admin";

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
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
