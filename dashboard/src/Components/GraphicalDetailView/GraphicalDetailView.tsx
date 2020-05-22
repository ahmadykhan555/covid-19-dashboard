import React from "react";
import { Modal } from "react-bootstrap";
import BarGraphComponent from "../BarGraph/BarGraph";
import LineGraphComponent from "../LineGraph/LineGraph";
import "./GraphicalDetailView.scss";
import PieChartComponent from "../PieChart/PieChart";
interface GraphicalDetailViewProps {
  showModal: boolean;
  onHideHandler: any;
  data?: any;
  graphFor: any;
}
const GraphicalDetailViewComponent: React.FC<GraphicalDetailViewProps> = ({
  showModal,
  onHideHandler,
  data,
  graphFor
}) => {
  return (
    <Modal show={showModal} onHide={onHideHandler} size="lg" centered>
      <Modal.Header closeButton closeLabel={"dismiss"}>
        Worldwide Spread
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body-cs">
          <div className="slot-1 slot">
            {/* <BarGraphComponent data={data.barData} /> */}
          </div>
          <div className="slot-2 slot">
            <PieChartComponent data={data.pieData} />
          </div>
          <div className="slot-3 slot">
            <LineGraphComponent data={data.lineData} lineFor={graphFor} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GraphicalDetailViewComponent;
