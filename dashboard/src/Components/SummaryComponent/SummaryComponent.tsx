import React from "react";
import "./SummaryComponent.scss";
import SwitcherComponent, { SwitcherProps } from "../Switcher/Switcher";
interface SummaryProps extends SwitcherProps {
  flagSrc: string;
  entityName: string;
  cases: number;
  deaths: number;
  recovered: number;
  critical: number;
}
const SummaryComponent: React.FC<SummaryProps> = ({
  flagSrc,
  entityName,
  cases,
  deaths,
  recovered,
  critical,
  flag,
  stateHandler,
  switcherLabel
}) => {
  return (
    <div className="summary card-item">
      <div className="summary__header">
        <div className="flag-container">
          <img src={flagSrc} />
        </div>
        <h4 className="entity-name">{entityName}</h4>
        <div className="switcher-container">
          <SwitcherComponent
            switcherLabel={switcherLabel}
            flag={flag}
            stateHandler={stateHandler}
          />
        </div>
      </div>
      <div className="summary__stats">
        <div className="stats-tile stats-tile--cases">
          <label>Cases</label>
          <p className="numbers">{cases}</p>
        </div>
        <div className="stats-tile stats-tile--deaths">
          <label>Deaths</label>
          <p className="numbers">{deaths}</p>
        </div>
        <div className="stats-tile stats-tile--recovered">
          <label>Recovered</label>
          <p className="numbers">{recovered}</p>
        </div>
        <div className="stats-tile stats-tile--critical">
          <label>Critical</label>
          <p className="numbers">{critical}</p>
        </div>
      </div>
      <div className="summary__graph"></div>
    </div>
  );
};

export default SummaryComponent;
