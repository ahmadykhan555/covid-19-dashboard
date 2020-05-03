import React from "react";
import { ResponsiveBar, Data } from "@nivo/bar";
interface BarGraphProps {
  data: any[];
}
const BarGraphComponent: React.FC<BarGraphProps> = ({ data }) => {
  return (
    <div
      className="line-graph-component"
      style={{ height: "calc(100% - 30px)", width: "calc(100% - 20px)" }}
    >
      <ResponsiveBar
        colors={{ scheme: "nivo" }}
        data={data}
        padding={0.45}
        keys={["cases"]}
        indexBy="month"
        margin={{ top: 10, right: 10, bottom: 25, left: 60 }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        enableGridX={false}
        enableGridY={false}
      />
    </div>
  );
};

export default BarGraphComponent;
