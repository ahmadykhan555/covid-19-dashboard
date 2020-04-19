import React, { useState, useEffect } from "react";
import "./SummaryComponent.scss";
import SwitcherComponent, { SwitcherProps } from "../Switcher/Switcher";
import { Tile, TileComponent } from "../TileComponent/Tile";
import { getGlobalStats } from "../../shared/covid-data-api/api";
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
  switcherFlag,
  switcherStateHandler,
  switcherLabel
}) => {
  const [tabs, setTabs] = useState<any[]>(["global"]);
  const [activeTab, setActiveTab] = useState<string>("global");
  const [globalTiles, setGlobalTiles] = useState<Tile[]>([]);
  const [tiles, setTiles] = useState<Tile[]>([]);

  const renderTab = (label: string) => {
    return (
      <div
        onClick={() => setActiveTab(label)}
        className={`tab ${
          label === activeTab && tabs.length > 1 ? "active" : ""
        }`}
      >
        {label !== "global" && (
          <div className="flag-container">
            <img src={flagSrc} />
          </div>
        )}
        {label}
      </div>
    );
  };

  useEffect(() => {
    getGlobalStats().then(res => {
      if (res.data) {
        const { cases, deaths, critical, recovered } = res.data;
        setGlobalTiles([
          { label: "cases", numbers: cases },
          { label: "deaths", numbers: deaths },
          { label: "critical", numbers: critical },
          { label: "recovered", numbers: recovered }
        ]);
      }
    });
  }, []);

  useEffect(() => {
    if (entityName) {
      setTabs(["global", entityName]);
      setActiveTab(entityName);
      setTiles([
        { label: "cases", numbers: cases },
        { label: "deaths", numbers: deaths },
        { label: "critical", numbers: critical },
        { label: "recovered", numbers: recovered }
      ]);
    }
  }, [entityName]);

  const renderDetail = () => {
    return (
      <>
        <div className="tabs-container">{tabs.map(tab => renderTab(tab))}</div>
        <div className="summary__stats">
          {activeTab === "global"
            ? globalTiles.map((tile: Tile, index: number) => (
                <TileComponent
                  key={index}
                  label={tile.label}
                  numbers={tile.numbers}
                />
              ))
            : tiles.map((tile: Tile, index: number) => (
                <TileComponent
                  key={index}
                  label={tile.label}
                  numbers={tile.numbers}
                />
              ))}
        </div>
        <div className="summary__graph"></div>
      </>
    );
  };
  return <div className="summary card-item">{renderDetail()}</div>;
};

export default SummaryComponent;
