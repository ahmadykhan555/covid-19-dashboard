import React, { useState } from "react";
import "./Main.scss";
import MapBoxComponent from "../MapBox/MapBox";
import AllCountriesStatsComponent from "../AllCountriesStats/AllCountriesStatsComponent";
import GraphViewComponent from "../GraphView/GraphViewComponent";
import GraphicalDetailViewComponent from "../GraphicalDetailView/GraphicalDetailView";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../interfaces/meta";
const MainLayoutComponent: React.FC<PropsFromRedux> = ({
  graphViewExpanded,
  isMobile
}) => {
  return (
    <div className="main-layout-component">
      <section className="section-left">
        <div className="header-sec-left">
          <div className="app-banner">COVID WORLD TRACKER</div>
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
    isMobile: state.isMobileView
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MainLayoutComponent);
