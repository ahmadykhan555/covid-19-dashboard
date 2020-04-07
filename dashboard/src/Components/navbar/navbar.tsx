import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import "./NavBar.scss";

const Navbar = () => {
  let isAdmin: boolean = true;
  return (
    <div className="navbar">
      <div className="navigation">
        <h3 className="title">COVID-19</h3>
        <NavLink exact to="/" activeClassName="selected">
          <div className="nav-item">Map View</div>
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin" activeClassName="selected">
            <div className="nav-item">Admin</div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
