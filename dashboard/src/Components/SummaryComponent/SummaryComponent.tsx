import React from "react";
import "./SummaryComponent.scss";
import SwitcherComponent from "../Switcher/Switcher";
const SummaryTiles: React.FC<any> = () => {
  return (
    <div className="summary card-item">
      <div className="summary__header">
        <div className="flag-container">
          <img src="https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/us.png" />
        </div>
        <h4 className="country-name">USA</h4>
        <div className="switcher-container">
          <SwitcherComponent
            switcherLabel=""
            flag={true}
            stateHandler={() => {}}
          />
        </div>
      </div>
      <div className="summary__stats">
        <div className="stats-tile stats-tile--cases">
          <label>Cases</label>
          <p className="numbers">20k</p>
        </div>
        <div className="stats-tile stats-tile--deaths">
          <label>Deaths</label>
          <p className="numbers">20k</p>
        </div>
        <div className="stats-tile stats-tile--recovered">
          <label>Recovered</label>
          <p className="numbers">20k</p>
        </div>
        <div className="stats-tile stats-tile--critical">
          <label>Critical</label>
          <p className="numbers">20k</p>
        </div>
      </div>
      <div className="summary__graph">Graph</div>
    </div>
  );
};

export default SummaryTiles;
