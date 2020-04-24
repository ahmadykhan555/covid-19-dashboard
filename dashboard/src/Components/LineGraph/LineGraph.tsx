import React from "react";
import { ResponsiveLine, Datum } from "@nivo/line";
interface LineGraphProps {
  lineFor?: string;
  data?: Datum[];
}
const LineGraphComponent: React.FC<LineGraphProps> = ({ lineFor, data }) => {
  const lineColor = (): string => {
    let color = "";
    if (lineFor == "cases") {
      color = "orange";
    } else if (lineFor == "critical") {
      color = "orangered";
    } else if (lineFor == "deaths") {
      color = "red";
    } else if (lineFor == "recovered") {
      color = "green";
    }
    return color;
  };
  return (
    <div
      className="line-graph-component"
      style={{ height: "calc(100% - 30px)", width: "calc(100% - 20px)" }}
    >
      <ResponsiveLine
        colors={lineColor}
        data={[
          {
            id: "cases",
            color: "green",
            data: data || []
          }
        ]}
        margin={{ top: 10, right: 10, bottom: 25, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle"
        }}
        enableGridX={false}
        enableGridY={false}
        // colors={{ scheme: "red_yellow_green" }}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        lineWidth={3}
      />
    </div>
  );
};

export default LineGraphComponent;
