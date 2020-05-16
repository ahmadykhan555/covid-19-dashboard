import React from "react";
import "./StatsCardComponent.scss";
import { formatNumber } from "../../shared/data-utility/utility";
interface CardProps {
  label: string;
  imgSrc: string;
  perMillionCount: number;
  casesCount: number;
  deathsCount: number;
  recoveredCount: number;
  selected?: boolean;
}
const StatsCardComponent: React.FC<CardProps> = ({
  label,
  imgSrc,
  perMillionCount,
  casesCount,
  deathsCount,
  recoveredCount,
  selected
}) => {
  return (
    <div className={`stats-card ${selected ? "card-selected" : ""}`}>
      <div className="stats-card__info">
        <div className="avatar">
          <img src={imgSrc || "https://via.placeholder.com/20"} />
        </div>
        <h3 className="label">{label || "Label"}</h3>
        <h3 className="per-mil-count">{perMillionCount || 12000}</h3>
      </div>
      <div className="stats-card__counts">
        <div className="stats-count-cell stats-count-cell--cases">
          {formatNumber(casesCount || 12000)}
        </div>
        <div className="stats-count-cell stats-count-cell--deaths">
          {formatNumber(deathsCount || 12000)}
        </div>
        <div className="stats-count-cell stats-count-cell--recovered">
          {formatNumber(recoveredCount || 12000)}
        </div>
      </div>
    </div>
  );
};
export default StatsCardComponent;
