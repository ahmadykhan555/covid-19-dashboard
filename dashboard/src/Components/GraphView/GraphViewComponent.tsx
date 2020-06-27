import React from "react";
import "./GraphViewComponent.scss";
import arrow from "../../img/arrow-up.svg";
import GraphCardComponent from "./CardComponent/GraphCardComponent";
import { connect, ConnectedProps } from "react-redux";
import { AppState, StoreActionTypes } from "../../interfaces/meta";
import { monthString } from "../../shared/data-utility/utility";
import { Datum } from "@nivo/line";
import BarGraphComponent from "../BarGraph/BarGraph";
import { Modal } from "react-bootstrap";
import moment from "moment";

interface GraphViewProps extends PropsFromRedux {}

const GraphViewComponent: React.FC<GraphViewProps> = ({
  historicData,
  setViewExpanded,
  viewExpanded,
  isMobileView,
  selectedEntity,
  showModal,
  setShowModal,
  loading
}) => {
  const sanitizeData = (label: string): Datum[] => {
    let data: Datum[] = [];
    if (!historicData) {
      return data;
    }
    if ((historicData.json as any)[label]) {
      const categoryData: any = (historicData.json as any)[label];
      const skipDays = 5;
      for (let date in categoryData) {
        const counts = categoryData[date];
        data.push({ x: moment(date).format("DD/MM"), y: counts });
      }
      const temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push(data[i]);
        i = i + skipDays;
      }
      data = temp;
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
        if (key !== "json") {
          initMonthRecord(month);
          data[month][key] = (historicData as any)[key][month].pop();
        }
      }
    }
    return data;

    // return barData;
  };

  const flagUrl = (): string => {
    if (
      selectedEntity &&
      selectedEntity.data &&
      selectedEntity.data.countryInfo
    ) {
      return selectedEntity.data.countryInfo.flag;
    }
    return "";
  };
  return isMobileView ? (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton closeLabel={"dismiss"}>
        <div
          className="country-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          {!loading && (
            <img
              src={flagUrl()}
              style={{ height: "25px", width: "35px", marginRight: "10px" }}
            />
          )}
          <span>{selectedEntity.name}</span>
        </div>
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
    selectedEntity: state.selectedEntity,
    historicData: state.selectedEntity.historicData,
    viewExpanded: state.graphViewExpanded,
    isMobileView: state.isMobileView,
    showModal: state.showModal,
    loading: state.historicDataLoading
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
