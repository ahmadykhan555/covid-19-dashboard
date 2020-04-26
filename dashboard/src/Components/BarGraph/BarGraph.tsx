import React from "react";
import { ResponsiveBar, Data } from "@nivo/bar";
interface BarGraphProps {
  lineFor?: string;
  data?: Data[];
}
const BarGraphComponent: any = () => {
  return (
    <div
      className="line-graph-component"
      style={{ height: "calc(100% - 30px)", width: "calc(100% - 20px)" }}
    >
      <ResponsiveBar
        colors={{ scheme: "nivo" }}
        data={[
          {
            month: "Jan",
            cases: 75,
            casesColor: "hsl(210, 70%, 50%)"
          },
          {
            month: "Feb",
            cases: 186,
            casesColor: "hsl(222, 70%, 50%)"
          },
          {
            month: "March",
            cases: 93,
            casesColor: "hsl(338, 70%, 50%)"
          },
          {
            month: "April",
            cases: 134,
            casesColor: "hsl(86, 70%, 50%)"
          }
        ]}
        padding={0.7}
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
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
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
