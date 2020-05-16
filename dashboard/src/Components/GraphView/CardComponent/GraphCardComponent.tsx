import React from "react";
import "./GraphCardComponent.scss";
import { Datum } from "@nivo/line";
import LineGraphComponent from "../../LineGraph/LineGraph";
interface GraphCardProps {
  cardLabel: "cases" | "deaths" | "recovered";
  sinceLabel: string;
  graphData: Datum[];
}
const GraphCardComponent: React.FC<GraphCardProps> = ({
  cardLabel,
  sinceLabel,
  graphData
}) => {
  return (
    <div className="graph-card-component">
      <div className="graph-card-header">
        <h4 className={`card-label card-label--${cardLabel}`}>{cardLabel}</h4>
        <h4 className="since-label">{sinceLabel}</h4>
      </div>

      <div className="graph-container">
        <LineGraphComponent lineFor={cardLabel} data={graphData} />
      </div>
    </div>
  );
};

export default GraphCardComponent;
