import React from "react";
import "./Tile.scss";
import { convertToThousand } from "../../shared/data-utility/utility";
export interface Tile {
  label: "cases" | "deaths" | "critical" | "recovered";
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
  return (
    <div
      className={`stats-tile stats-tile--${label} ${isSelected &&
        "selected-tile"} ${disable && "disable-tile"}`}
      onClick={clickHanlder}
    >
      <label>{label}</label>
      <p className="numbers">{convertToThousand(numbers)}</p>
    </div>
  );
};
