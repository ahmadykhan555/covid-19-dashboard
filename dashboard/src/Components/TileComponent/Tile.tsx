import React from "react";
import "./Tile.scss";
import {
  convertToThousand,
  CovidMetrics
} from "../../shared/data-utility/utility";
export interface Tile {
  label: CovidMetrics;
  numbers: number;
  clickHanlder?: () => void;
  isSelected?: boolean;
  disable?: boolean;
}
export const TileComponent: React.FC<Tile> = ({
  label,
  numbers,
  clickHanlder,
  isSelected,
  disable
}) => {
  const handleClick = () => {
    if (clickHanlder && !disable) {
      clickHanlder();
    }
  };
  return (
    <div
      className={`stats-tile stats-tile--${label} ${isSelected &&
        "selected-tile"} ${disable && "disable-tile"}`}
      onClick={handleClick}
    >
      <label>{label}</label>
      <p className="numbers">{convertToThousand(numbers)}</p>
    </div>
  );
};
