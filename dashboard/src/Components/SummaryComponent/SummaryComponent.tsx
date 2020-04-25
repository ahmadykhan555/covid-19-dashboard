import React, { useState, useEffect } from "react";
import "./SummaryComponent.scss";
import { SwitcherProps } from "../Switcher/Switcher";
import { Tile, TileComponent } from "../TileComponent/Tile";
import {
  getGlobalStats,
  getGlobalHistoricData,
  getHistoricDataForCountry
} from "../../shared/covid-data-api/api";
import LineGraphComponent from "../LineGraph/LineGraph";
import { Datum } from "@nivo/line";
import { monthString, CovidMetrics } from "../../shared/data-utility/utility";
interface SummaryProps extends SwitcherProps {
  flagSrc: string;
  entityName: string;
  ISOName: string;
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
  ISOName
}) => {
  const [tabs, setTabs] = useState<any[]>(["global"]);
  const [activeTab, setActiveTab] = useState<string>("global");
  const [globalTiles, setGlobalTiles] = useState<Tile[]>([]);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [historicCluster, setHistoricCluster] = useState<any[]>([]);
  const [globalHistoricCluster, setGlobalHistoricCluster] = useState<any[]>([]);
  const [selectedTile, setSelectedTile] = useState<number>(0);
  const [graphData, setGraphData] = useState<Datum[]>([]);
  const [graphFor, setGraphFor] = useState<string>("cases");

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
          { label: CovidMetrics.Cases, numbers: cases },
          { label: CovidMetrics.Deaths, numbers: deaths },
          { label: CovidMetrics.Critical, numbers: critical },
          { label: CovidMetrics.Recovered, numbers: recovered }
        ]);
      }
    });
    getGlobalHistoricData().then((res: any) => {
      setGlobalHistoricCluster(res);
      setHistoricCluster(res);
    });
  }, []);

  useEffect(() => {
    if (entityName) {
      setTabs(["global", entityName]);
      setActiveTab(entityName);
      setTiles([
        { label: CovidMetrics.Cases, numbers: cases },
        { label: CovidMetrics.Deaths, numbers: deaths },
        { label: CovidMetrics.Critical, numbers: critical },
        { label: CovidMetrics.Recovered, numbers: recovered }
      ]);
      getHistoricDataForCountry(ISOName).then((res: any) =>
        setHistoricCluster(res)
      );
    }
  }, [entityName]);

  useEffect(() => {
    let key: CovidMetrics = CovidMetrics.Cases;
    if (selectedTile === 0) {
      key = CovidMetrics.Cases;
    } else if (selectedTile === 1) {
      key = CovidMetrics.Deaths;
    } else if (selectedTile === 3) {
      key = CovidMetrics.Recovered;
    }
    const data: Datum[] = [];
    const cases = (historicCluster as any)[key];
    for (let month in cases) {
      data.push({ x: monthString(Number(month)), y: cases[month].pop() });
    }
    setGraphData(data);
    setGraphFor(key);
  }, [historicCluster, selectedTile]);

  useEffect(() => {
    globalHistoricCluster && setHistoricCluster(globalHistoricCluster);
  }, [activeTab]);

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
                  clickHanlder={() => {
                    setSelectedTile(index);
                  }}
                  isSelected={index === selectedTile}
                  disable={index === 2}
                />
              ))
            : tiles.map((tile: Tile, index: number) => (
                <TileComponent
                  key={index}
                  label={tile.label}
                  numbers={tile.numbers}
                  clickHanlder={() => {
                    setSelectedTile(index);
                  }}
                  isSelected={index === selectedTile}
                  disable={index === 2}
                />
              ))}
        </div>
        {historicCluster && (
          <div className="summary__graph">
            <LineGraphComponent data={graphData} lineFor={graphFor} />
          </div>
        )}{" "}
      </>
    );
  };
  return <div className="summary card-item">{renderDetail()}</div>;
};

export default SummaryComponent;
