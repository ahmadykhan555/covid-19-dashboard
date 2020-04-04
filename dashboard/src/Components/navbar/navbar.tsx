import React from "./node_modules/react";
import { NavLink, withRouter } from "./node_modules/react-router-dom";

import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navigation">
        <h3 className="title">COVID-19</h3>
        <NavLink exact to="/" activeClassName="selected">
          <div className="nav-item">Map View</div>
        </NavLink>
        <NavLink to="/trajectory" activeClassName="selected">
          <div className="nav-item">Trajectory</div>
        </NavLink>
        <NavLink to="/news" activeClassName="selected">
          <div className="nav-item">News</div>
        </NavLink>
        <NavLink to="/zones" activeClassName="selected">
          <div className="nav-item">Zones</div>
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
