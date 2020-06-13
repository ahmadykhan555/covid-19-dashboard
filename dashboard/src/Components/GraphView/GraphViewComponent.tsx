import React, { useState, useEffect } from "react";
import "./GraphViewComponent.scss";
import arrow from "../../img/arrow-up.svg";
import GraphCardComponent from "./CardComponent/GraphCardComponent";
import { connect, ConnectedProps } from "react-redux";
import {
  AppState,
  StoreActionTypes,
  HistoricData
} from "../../interfaces/meta";
import { monthString } from "../../shared/data-utility/utility";
import { Datum } from "@nivo/line";
import BarGraphComponent from "../BarGraph/BarGraph";
import { Modal } from "react-bootstrap";

interface GraphViewProps extends PropsFromRedux {}
// interface GraphViewProps {
//   onHideHandler: () => void;
// }

const GraphViewComponent: React.FC<GraphViewProps> = ({
  historicData,
  setViewExpanded,
  viewExpanded,
  isMobileView,
  setMobileView,
  showModal,
  setShowModal
}) => {
  const sanitizeData = (label: string): Datum[] => {
    const data: Datum[] = [];
    if (!historicData) {
      return data;
    }
    if (label === "cases") {
      for (let month in historicData.cases) {
        const max = ((historicData.cases as any)[month] as any).pop();
        data.push({ x: monthString(Number(month)), y: max });
      }
    }
    if (label === "deaths") {
      for (let month in historicData.deaths) {
        const max = ((historicData.deaths as any)[month] as any).pop();
        data.push({ x: monthString(Number(month)), y: max });
      }
    }
    if (label === "recovered") {
      for (let month in historicData.recovered) {
        const max = ((historicData.recovered as any)[month] as any).pop();
        data.push({ x: monthString(Number(month)), y: max });
      }
    }
    return data;
  };

  const sanitizeForBar = () => {
    const data: any = {};
    const initMonthRecord = (month: string) => {
      if (!data[month]) {
        data[month] = {
          month: monthString(Number(month)),
          cases: 0,
          recovered: 0,
          deaths: 0
        };
      }
    };
    for (let key in historicData) {
      for (let month in (historicData as any)[key]) {
        initMonthRecord(month);
        data[month][key] = (historicData as any)[key][month].pop();
      }
    }
    return data;

    // return barData;
  };
  return isMobileView ? (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton closeLabel={"dismiss"}>
        Worldwide Spread
      </Modal.Header>
      <Modal.Body>
        <div className="graph-view-component graph-view-component--mobile-view">
          <div className="graph-view-cards">
            <div className="graphs-by-category">
              <GraphCardComponent
                cardLabel="cases"
                sinceLabel="+236 since yesterday"
                graphData={sanitizeData("cases")}
              />
              <GraphCardComponent
                cardLabel="recovered"
                sinceLabel="+236 since yesterday"
                graphData={sanitizeData("recovered")}
              />
              <GraphCardComponent
                cardLabel="deaths"
                sinceLabel="+236 since yesterday"
                graphData={sanitizeData("deaths")}
              />
            </div>
            <div className="comparison-graph">
              <BarGraphComponent data={sanitizeForBar()} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  ) : (
    <div className="graph-view-component">
      <div
        className="graph-view-control"
        onClick={() => setViewExpanded(!viewExpanded)}
      >
        <img
          src={arrow}
          style={{ transform: `${viewExpanded ? "rotate(180deg)" : ""}` }}
        ></img>
        <img
          src={arrow}
          style={{ transform: `${viewExpanded ? "rotate(180deg)" : ""}` }}
        ></img>
      </div>
      <div className="graph-view-cards">
        <div className="graphs-by-category">
          <GraphCardComponent
            cardLabel="cases"
            sinceLabel="+236 since yesterday"
            graphData={sanitizeData("cases")}
          />
          <GraphCardComponent
            cardLabel="recovered"
            sinceLabel="+236 since yesterday"
            graphData={sanitizeData("recovered")}
          />
          <GraphCardComponent
            cardLabel="deaths"
            sinceLabel="+236 since yesterday"
            graphData={sanitizeData("deaths")}
          />
        </div>
        <div className="comparison-graph">
          <BarGraphComponent data={sanitizeForBar()} />
        </div>
      </div>
    </div>
  );
};

// Connect to global store
const mapStateToProps = (state: AppState) => {
  return {
    historicData: state.selectedEntity.historicData,
    viewExpanded: state.graphViewExpanded,
    isMobileView: state.isMobileView,
    showModal: state.showModal
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setViewExpanded: (expanded: boolean) =>
      dispatch({
        type: StoreActionTypes.SetGraphViewExpanded,
        payload: expanded
      }),
    setMobileView: (expanded: boolean) =>
      dispatch({
        type: StoreActionTypes.SetMobileView,
        payload: expanded
      }),
    setShowModal: (expanded: boolean) =>
      dispatch({
        type: StoreActionTypes.SetShowModal,
        payload: expanded
      })
  };
};

type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default connector(GraphViewComponent);
