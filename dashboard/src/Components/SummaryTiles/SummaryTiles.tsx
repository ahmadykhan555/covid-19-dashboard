import React from "react";
import "./SummaryTiles.scss";
const SummaryTiles: React.FC<any> = () => {
  return (
    <div className="summary">
      <div className="tile-with-badge">Tile 1 </div>
      <div className="tile-with-badge">Tile 2 </div>
      <div className="tile-with-badge">Tile 3 </div>
      <div className="tile-with-badge">Tile 4 </div>
    </div>
  );
};

export default SummaryTiles;
