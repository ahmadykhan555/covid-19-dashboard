import React from "react";
import { Line } from '@nivo/line'
import "./trajectory.scss";



const Trajectory: React.FC<any> = () => {
  const kFormatter = (num: any) => {
    return Math.abs(num) > 999 ? 
    Math.sign(num) * (+(Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }
  return (
    <Line
        curve="monotoneX"
        data={[
          {
              id: 'fake corp. A',
              data: [
                  { x: '2018-01-22', y: 580 },
                  { x: '2018-01-23', y: 100000 },
                  { x: '2018-01-24', y: 150000 },
                  { x: '2018-01-25', y: 175000 },
                  { x: '2018-01-26', y: 200000 },
                  { x: '2018-01-27', y: 250000 },
                  { x: '2018-01-28', y: 350000 },
                  { x: '2018-01-29', y: 400000 },
                  { x: '2018-01-30', y: 550000 },
                  { x: '2018-01-31', y: 665000 },
                  { x: '2018-02-01', y: 700000 },
                  { x: '2018-02-02', y: 780000 },
                  { x: '2018-02-03', y: 850000 },
                  { x: '2018-02-04', y: 1000000 },

              ],
          }
      ]}
      // gridYValues = {[
      //   0, 25, 50, 75,100
      // ]}
        width = {600}
        height = {300}
        lineWidth = {5}
        enableGridX = {false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          stacked: false,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          legend: 'linear scale',
          legendOffset: 12,
          format: value =>
          `${kFormatter(value)}`
              // `${Number(value).toLocaleString('ru-RU', {
              //     minimumFractionDigits: 0,
              //     minimumIntegerDigits: 1
              // })} ₽`,
          // format: v => `${v}%`
        }}
        axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
            legend: 'time scale',
            legendOffset: -12,
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
    />
  );
};
export default Trajectory;


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.