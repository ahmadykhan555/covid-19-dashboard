import React from "react";
import { Button } from "react-bootstrap";
import "./Switcher.scss";
import { GoGlobe } from "react-icons/all";
const SwitcherComponent: React.FC = () => {
  return (
    <div className="switcher-component">
      <Button variant="link" className="country-stats">
        🇵🇰
      </Button>
      <Button variant="link" className="global-stats">
        <GoGlobe />
      </Button>
    </div>
  );
};

export default SwitcherComponent;
