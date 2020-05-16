import React from "react";
import "./GraphCardComponent.scss";
import { Datum } from "@nivo/line";
import LineGraphComponent from "../../LineGraph/LineGraph";
import { Spinner } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../../interfaces/meta";
interface GraphCardProps extends PropsFromRedux {
  cardLabel: "cases" | "deaths" | "recovered";
  sinceLabel: string;
  graphData: Datum[];
}
const GraphCardComponent: React.FC<GraphCardProps> = ({
  cardLabel,
  sinceLabel,
  graphData,
  loading
}) => {
  const showLoader = () => {
    return <Spinner animation="border" variant="secondary" />;
  };
  const showGraph = () => {
    return <LineGraphComponent lineFor={cardLabel} data={graphData} />;
  };
  return (
    <div className="graph-card-component">
      <div className="graph-card-header">
        <h4 className={`card-label card-label--${cardLabel}`}>{cardLabel}</h4>
        <h4 className="since-label">{sinceLabel}</h4>
      </div>
      <div className="graph-container">
        {loading ? showLoader() : showGraph()}
      </div>
    </div>
  );
};

const mapPropsToState = (state: AppState) => {
  return {
    loading: state.historicDataLoading
  };
};

const connector = connect(mapPropsToState);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(GraphCardComponent);
