import React from "react";
import "./SummaryComponent.scss";
import SwitcherComponent, { SwitcherProps } from "../Switcher/Switcher";
import { convertToThousand } from "../../shared/data-utility/utility";
interface SummaryProps extends SwitcherProps {
  flagSrc: string;
  entityName: string;
  cases: number;
  deaths: number;
  recovered: number;
  critical: number;
}

interface Tile {
  label: string;
  numbers: number;
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
  const tiles: Tile[] = [
    { label: "cases", numbers: cases },
    { label: "deaths", numbers: deaths },
    { label: "critical", numbers: critical },
    { label: "recovered", numbers: recovered }
  ];
  const renderTile = (tile: Tile) => {
    return (
      <div className={`stats-tile stats-tile--${tile.label}`}>
        <label>{tile.label}</label>
        <p className="numbers">{convertToThousand(tile.numbers)}</p>
      </div>
    );
  };
  const renderDetail = () => {
    return (
      <>
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
          {tiles.map(tile => renderTile(tile))}
        </div>
        <div className="summary__graph"></div>
      </>
    );
  };
  return (
    <div className="summary card-item">{entityName && renderDetail()}</div>
  );
};

export default SummaryComponent;
