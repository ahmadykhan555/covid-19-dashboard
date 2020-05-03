import React from "react";
import { ResponsivePie } from "@nivo/pie";
interface PieChartProps {
  data: any[];
}
const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  console.log("pie data", data);
  const getColors = (pie: any) => {
    //   const id = pie.id;
    const colors: any = {
      cases: "rgba(255,0,0,1)",
      deaths: "rgba(255,0,0,0.8)",
      critical: "rgba(255,0,0,0.7)",
      recovered: "rgba(255,0,0,0.6)"
    };
    debugger;
    return colors[pie.id];
  };
  return (
    <ResponsivePie
      data={data || []}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={0}
      borderWidth={1}
      colors={getColors}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#ffffff"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#ffffff"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      sortByValue={true}
    />
  );
};

export default PieChartComponent;
