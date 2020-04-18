import React from "react";
import "./Switcher.scss";
import Switch from "react-switch";

export interface SwitcherProps {
  switcherLabel: string;
  flag: boolean;
  stateHandler: any;
}

const SwitcherComponent: React.FC<SwitcherProps> = ({
  switcherLabel,
  flag,
  stateHandler
}) => {
  return (
    <div className="switcher-component">
      <label>{switcherLabel}</label>
      <Switch
        onChange={() => stateHandler(!flag)}
        checked={flag}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
      />
    </div>
  );
};

export default SwitcherComponent;
