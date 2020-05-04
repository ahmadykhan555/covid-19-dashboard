import React from "react";
import "./ComingSoon.scss";
import icon from "./covid.svg";
import bg1 from "./bg-1.jpg";
import { Button } from "react-bootstrap";
const ComingSoonComponent = () => {
  return (
    <div className="comming-soon-page">
      <div
        className="coming-soon-section left-section"
        style={{ backgroundImage: `url(${bg1})` }}
      ></div>
      <div className="coming-soon-section right-section">
        <div className="content-wrapper">
          <div className="img-header">
            <img src={icon} alt="" style={{ height: "100%", width: "100%" }} />
          </div>
          <h4 className="stay-tuned">Stay Tuned</h4>
          <h2 className="launching-soon">We Will Launch Soon</h2>
          <h2 className="subscribe">
            Subscribe to get notified as soon as we go live!
          </h2>
          <div className="subscription-form" style={{ display: "flex" }}>
            <input type="email"></input>
            <Button variant="success">Subscribe</Button>
          </div>
          <h4 className="drop-email">
            To know more, drop us an email at
            <strong> support@covidworldtracker.com</strong>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonComponent;
