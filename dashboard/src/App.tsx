import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './Components/navbar/navbar'
import MapView from './Components/MapView/mapview'
import Trajectory from './Components/Trajectory/trajectory'
import News from './Components/News/news'
import Zone from './Components/Zone/zone'

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component = { MapView }/>
          <Route exact path='/trajectory' component = { Trajectory }/>
          <Route exact path='/trajectory' component = { News }/>
          <Route exact path='/trajectory' component = { Zone }/>
        </Switch>
      </div>
  </BrowserRouter>
  );
};
export default App;
