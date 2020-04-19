import React from "react";
import "./Tile.scss";
import { convertToThousand } from "../../shared/data-utility/utility";
export interface Tile {
  label: "cases" | "deaths" | "critical" | "recovered";
  numbers: number;
}
export const TileComponent: React.FC<Tile> = ({ label, numbers }) => {
  return (
    <div className={`stats-tile stats-tile--${label}`}>
      <label>{label}</label>
      <p className="numbers">{convertToThousand(numbers)}</p>
    </div>
  );
};
