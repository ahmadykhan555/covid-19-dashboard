import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import MainLayoutComponent from "./components/Main/Main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideMenu from "./components/SideMenu/SideMenu";
import SuccessStories from "./components/SuccessStories/SuccessStories";

export enum Routes {
  Landing = "/",
  MobileMenu = "/menu-mb",
  SuccessStories = "/stories"
}

const App: React.FC<any> = () => {
  return (
    <div className="app-wrapper">
      <Router>
        <Switch>
          <Route
            path={Routes.Landing}
            exact
            component={MainLayoutComponent}
          ></Route>
          <Route path={Routes.MobileMenu} exact component={SideMenu}></Route>
          <Route
            path={Routes.SuccessStories}
            exact
            component={SuccessStories}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
