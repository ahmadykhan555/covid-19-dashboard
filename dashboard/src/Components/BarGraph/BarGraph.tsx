import React, { useState } from "react";
import { ResponsiveBar, Data, BarExtendedDatum, TooltipProp } from "@nivo/bar";
import "./BarGraph.scss";
interface BarGraphProps {
  data: any;
}
const BarGraphComponent: React.FC<BarGraphProps> = ({ data }) => {
  let sanitizedData: any = [];
  if (data) {
    let sanitized = [];
    for (let entry in data) {
      sanitized.push(data[entry]);
    }
    // sanitized = sanitized.slice(sanitized.length - 2);
    sanitizedData = [...sanitized];
  }
  const getColor = (obj: any): string => {
    if (obj.id === "cases") {
      return "#828282";
    } else if (obj.id === "recovered") {
      return "#27AE60";
    } else if (obj.id === "deaths") {
      return "#EB5757";
    } else {
      return "#828282";
    }
  };

  const customTooltip = (obj: any) => {
    return (
      <div
        className="custom-tooltip"
        style={{
          display: "flex",
          color: "black",
          alignItems: "center",
          padding: "1rem"
        }}
      >
        <div
          className="color-container"
          style={{
            background: `${getColor(obj)}`,
            height: "1rem",
            width: "1rem",
            marginRight: "0.5rem"
          }}
        ></div>
        <h4 style={{ textTransform: "capitalize" }}>{obj.id}: </h4>
        <h4 className="value-label"> {obj.value}</h4>
      </div>
    );
  };
  return (
    <div
      className="line-graph-component"
      style={{ height: "calc(100% - 30px)", width: "calc(100% - 20px)" }}
    >
      <ResponsiveBar
        colors={getColor}
        data={sanitizedData}
        padding={0.6}
        keys={["cases", "deaths", "recovered"]}
        indexBy="month"
        margin={{ top: 10, right: 10, bottom: 25, left: 60 }}
        borderColor={getColor}
        groupMode="grouped"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40
        }}
        enableGridX={true}
        enableGridY={true}
        enableLabel={false}
        tooltip={customTooltip}
      />
    </div>
  );
};

export default BarGraphComponent;
