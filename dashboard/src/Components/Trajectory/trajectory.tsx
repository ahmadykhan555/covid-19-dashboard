import React from "react";
import { ResponsiveLine } from "@nivo/line";
import "./Trajectory.scss";

const Trajectory: React.FC<any> = () => {
  const kFormatter = (num: any) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <div className="trajectory">
      <ResponsiveLine
        curve="monotoneX"
        data={[
          {
            id: "cases:",
            // "color": "hsl(120,100%,50%)",
            data: [
              { x: "2020-01-22", y: 0 },
              { x: "2020-01-23", y: 0 },
              { x: "2020-01-24", y: 0 },
              { x: "2020-01-25", y: 0 },
              { x: "2020-01-26", y: 0 },
              { x: "2020-01-27", y: 0 },
              { x: "2020-01-28", y: 0 },
              { x: "2020-01-29", y: 0 },
              { x: "2020-01-30", y: 0 },
              { x: "2020-01-31", y: 0 },
              { x: "2020-02-01", y: 0 },
              { x: "2020-02-02", y: 0 },
              { x: "2020-02-03", y: 0 },
              { x: "2020-02-04", y: 0 },
              { x: "2020-02-05", y: 0 },
              { x: "2020-02-06", y: 0 },
              { x: "2020-02-07", y: 0 },
              { x: "2020-02-08", y: 0 },
              { x: "2020-02-09", y: 0 },
              { x: "2020-02-10", y: 0 },
              { x: "2020-02-11", y: 0 },
              { x: "2020-02-12", y: 0 },
              { x: "2020-02-13", y: 0 },
              { x: "2020-02-14", y: 0 },
              { x: "2020-02-15", y: 0 },
              { x: "2020-02-16", y: 0 },
              { x: "2020-02-17", y: 0 },
              { x: "2020-02-18", y: 0 },
              { x: "2020-02-19", y: 0 },
              { x: "2020-02-20", y: 0 },
              { x: "2020-02-21", y: 0 },
              { x: "2020-02-22", y: 0 },
              { x: "2020-02-23", y: 0 },
              { x: "2020-02-24", y: 0 },
              { x: "2020-02-25", y: 0 },
              { x: "2020-02-26", y: 2 },
              { x: "2020-02-27", y: 2 },
              { x: "2020-02-28", y: 2 },
              { x: "2020-02-29", y: 4 },
              { x: "2020-03-01", y: 4 },
              { x: "2020-03-02", y: 4 },
              { x: "2020-03-03", y: 5 },
              { x: "2020-03-04", y: 5 },
              { x: "2020-03-05", y: 5 },
              { x: "2020-03-06", y: 6 },
              { x: "2020-03-07", y: 6 },
              { x: "2020-03-08", y: 6 },
              { x: "2020-03-09", y: 6 },
              { x: "2020-03-10", y: 16 },
              { x: "2020-03-11", y: 19 },
              { x: "2020-03-12", y: 20 },
              { x: "2020-03-13", y: 28 },
              { x: "2020-03-14", y: 31 },
              { x: "2020-03-15", y: 53 },
              { x: "2020-03-16", y: 136 },
              { x: "2020-03-17", y: 236 },
              { x: "2020-03-18", y: 299 },
              { x: "2020-03-19", y: 454 },
              { x: "2020-03-20", y: 501 },
              { x: "2020-03-21", y: 730 },
              { x: "2020-03-22", y: 776 },
              { x: "2020-03-23", y: 875 },
              { x: "2020-03-24", y: 972 },
              { x: "2020-03-25", y: 1063 },
              { x: "2020-03-26", y: 1201 },
              { x: "2020-03-27", y: 1373 },
              { x: "2020-03-28", y: 1495 },
              { x: "2020-03-29", y: 1597 },
              { x: "2020-03-30", y: 1717 },
              { x: "2020-03-31", y: 1938 },
              { x: "2020-04-01", y: 2118 },
              { x: "2020-04-02", y: 2421 },
              { x: "2020-04-03", y: 2686 }


            ]
          }
        ]}
        colors={['#63cafa']}
        // gridYValues = {[
        //   0, 25, 50, 75,100
        // ]}
        lineWidth={3}
        enableGridX={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          precision: "day"
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          stacked: false
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          legend: "Total Corona Virus Cases in Pakistan",
          legendOffset: -45,
          format: value => `${kFormatter(value)}`
          // `${Number(value).toLocaleString('ru-RU', {
          //     minimumFractionDigits: 0,
          //     minimumIntegerDigits: 1
          // })} ₽`,
          // format: v => `${v}%`
        }}
        enablePoints = {true}
        // enablePointLabel = {true}
        axisBottom={{
          format: "%b %d",
          tickValues: "every 8 days",
          tickRotation: -30
        }}
        animate = {true}
        enableSlices = 'x'
        useMesh = {false}
        isInteractive = {true}
        // colors={{ scheme: "nivo" }}
        tooltip={(value) => (
            <div>
                {'sada'}
                <strong >
                    {value.point.data.y}
                </strong>  
                
            </div>    
        )}
        theme={{
            tooltip: {
                container: {
                    color: 'black',
                    border: '1px solid',
                    borderColor: '#63cafa',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    fontSize: '12px',
                    background: '#F5F5F5',
                },
            },
        }}


        pointSize={4}
        // pointColor="#000000"
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
      />
    </div>
  );
};
export default Trajectory;

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
