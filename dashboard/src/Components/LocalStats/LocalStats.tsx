import React from "react";
import "./LocalStats.scss";

const LocalStatsComponent: React.FC<any> = () => {
  const states = [
    "punjab",
    "kpk",
    "sindh",
    "Azad jammu & kashmir",
    "Balochistan",
    "Gilgit Baltistan",
    "FATA"
  ];
  const stateStatsSection = (name: string) => {
    return (
      <div className="state-stats-wrapper">
        <label className="state-name-label">{name}</label>
        <div className="state-detail-stats">
          <p className="state-detail-item">Total Deaths: 10</p>
          <p className="state-detail-item">Total Infections: 22</p>
          <p className="state-detail-item">Total Recovered: 8</p>
          <p className="state-detail-item">Total under observation: 120</p>
          <p className="state-detail-item">Total discharged: 110</p>
          <p className="state-detail-item">Total tested: 110</p>
        </div>
      </div>
    );
  };
  return (
    <div className="local-stats-component-wrapper">
      <div className="summary">
        <div className="tile-with-badge">Tile 1 </div>
        <div className="tile-with-badge">Tile 2 </div>
        <div className="tile-with-badge">Tile 3 </div>
        <div className="tile-with-badge">Tile 4 </div>
      </div>
      {states.map(state => stateStatsSection(state))}
    </div>
  );
};

export default LocalStatsComponent;
