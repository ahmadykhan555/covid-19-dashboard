import React from "react";
import { Modal } from "react-bootstrap";
interface AboutModalProps {
  stateSetter: any;
}
const AboutModalComponent: React.FC<AboutModalProps> = ({ stateSetter }) => {
  return (
    <Modal show={stateSetter}>
      <Modal.Header closeButton>About Us</Modal.Header>
      <Modal.Body>
        <div className="about-us-content-wrapper"></div>
      </Modal.Body>
    </Modal>
  );
};

export default AboutModalComponent;
