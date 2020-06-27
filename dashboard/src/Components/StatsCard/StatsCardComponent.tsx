import React from "react";
import "./StatsCardComponent.scss";
import { formatNumber } from "../../shared/data-utility/utility";
import { GLOBAL_CARD_LABEL } from "../../interfaces/meta";
interface CardProps {
  label: string;
  imgSrc: string;
  perMillionCount: number;
  casesCount: number;
  deathsCount: number;
  recoveredCount: number;
  selected?: boolean;
  index: number;
  onClick: (index: number) => void;
}
const StatsCardComponent: React.FC<CardProps> = ({
  label,
  imgSrc,
  perMillionCount,
  casesCount,
  deathsCount,
  recoveredCount,
  selected,
  index,
  onClick
}) => {
  return (
    <div
      className={`stats-card ${selected ? "card-selected" : ""}`}
      onClick={() => onClick(index)}
      key={index}
    >
      <div className="stats-card__info">
        <div
          className={`avatar ${
            label === GLOBAL_CARD_LABEL ? "avatar-globe" : ""
          }`}
        >
          {label !== GLOBAL_CARD_LABEL && <span>#{index + 1}</span>}
          <img src={imgSrc || "https://via.placeholder.com/20"} />
        </div>
        <h3 className="label">{label}</h3>
        <h3 className="per-mil-count">
          {deathsCount === 0 && casesCount === 0
            ? 0
            : deathsCount === 0
            ? 0
            : ((deathsCount / casesCount) * 100).toFixed(2)}
          %
        </h3>
      </div>
      <div className="stats-card__counts">
        <div className="stats-count-cell stats-count-cell--cases">
          {casesCount}
        </div>
        <div className="stats-count-cell stats-count-cell--deaths">
          {deathsCount}
        </div>
        <div className="stats-count-cell stats-count-cell--recovered">
          {recoveredCount}
        </div>
      </div>
    </div>
  );
};
export default StatsCardComponent;
