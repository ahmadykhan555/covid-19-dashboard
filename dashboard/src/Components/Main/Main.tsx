import React, { useState } from "react";
import "./Main.scss";
import MapBoxComponent from "../MapBox/MapBox";
import AllCountriesStatsComponent from "../AllCountriesStats/AllCountriesStatsComponent";
import GraphViewComponent from "../GraphView/GraphViewComponent";
import { connect, ConnectedProps } from "react-redux";
import { AppState, StoreActionTypes } from "../../interfaces/meta";
import { GiHamburgerMenu } from "react-icons/all";
import SideMenu from "../SideMenu/SideMenu";
const MainLayoutComponent: React.FC<PropsFromRedux> = ({
  graphViewExpanded,
  isMobile,
  menuExpanded,
  setMenuExpanded
}) => {
  return (
    <div className="main-layout-component">
      {menuExpanded && <SideMenu />}
      <section className="section-left">
        <div className="header-sec-left">
          <div className="app-banner">
            {isMobile && (
              <GiHamburgerMenu
                onClick={() => setMenuExpanded(!menuExpanded)}
                style={{
                  position: "absolute",
                  left: "1rem",
                  fontSize: "1rem"
                }}
              />
            )}
            <h1>COVID WORLD TRACKER</h1>
          </div>
          <div className="useful-links" style={{ display: "none" }}>
            <a href="https://www.covidplasma.pk" target="_blank">
              Donate Plasma
            </a>
          </div>
          <div className="stats-definitions">
            <div className="def-cell def-cell--cases">
              <div className="def-cell__rect"></div>
              <h4 className="def-cell__label">Cases</h4>
            </div>
            <div className="def-cell def-cell--deaths">
              <div className="def-cell__rect"></div>
              <h4 className="def-cell__label">Deaths</h4>
            </div>
            <div className="def-cell def-cell--recovered">
              <div className="def-cell__rect"></div>
              <h4 className="def-cell__label">Recovered</h4>
            </div>
            <div className="def-cell def-cell--per-mil">
              <div className="def-cell__rect"></div>
              <h4 className="def-cell__label">Cases/Million</h4>
            </div>
          </div>
        </div>
        {<AllCountriesStatsComponent />}
      </section>
      <div className="section-right">
        {!isMobile && (
          <section className="map-container">
            <MapBoxComponent />
          </section>
        )}
        <section
          className={`graphs-overlay ${graphViewExpanded ? "expanded" : ""}`}
        >
          <GraphViewComponent />
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    graphViewExpanded: state.graphViewExpanded,
    isMobile: state.isMobileView,
    menuExpanded: state.menuExpanded
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setMenuExpanded: (payload: boolean) =>
      dispatch({ type: StoreActionTypes.SetMenuExpanded, payload })
  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MainLayoutComponent);
