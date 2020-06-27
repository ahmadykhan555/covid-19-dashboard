import React from "react";
import "./ComingSoon.scss";
import bg1 from "./bg-1.jpg";
import { Button } from "react-bootstrap";
import CountDown from "react-countdown";
import moment from "moment";
const ComingSoonComponent = () => {
  const timeNow = moment();
  const weekAhead = moment("12/05/2020");
  const durationInMS = moment
    .duration(weekAhead.diff(timeNow))
    .asMilliseconds();
  return (
    <div className="comming-soon-page">
      <div
        className="coming-soon-section left-section"
        style={{
          backgroundImage: `url(${bg1})`
        }}
      >
        <h4 className="stay-tuned">Stay Tuned</h4>

        <div className="counter">
          <CountDown date={Date.now() + durationInMS / 32} />
          <div className="days-legend">
            <h4>Days</h4>
            <h4>Hr</h4>
            <h4>Min</h4>
            <h4>Sec</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonComponent;
