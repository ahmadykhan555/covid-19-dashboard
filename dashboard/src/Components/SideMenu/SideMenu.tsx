import React from "react";
import "./SideMenu.scss";
import { AiOutlineClose, MdLocalHospital, FaMedal } from "react-icons/all";
import { connect, ConnectedProps } from "react-redux";
import { StoreActionTypes } from "../../interfaces/meta";

const SideMenu: React.FC<PropsFromRedux> = ({ setMenuExpanded }) => {
  return (
    <div className="side-menu-component">
      <div
        className="actions"
        onClick={() => {
          setMenuExpanded(false);
        }}
      >
        <AiOutlineClose />
      </div>
      <div className="app-banner">
        <h1>COVID WORLD TRACKER</h1>
      </div>
      <div className="useful-links">
        <a href="https://covidplasma.pk" target="_blank">
          <span>Plasma Donation</span>
          <MdLocalHospital
            style={{ marginLeft: "0.5rem", fontSize: "1.25rem" }}
          />
        </a>
        <a href="https://covidplasma.pk" target="_blank">
          <span>Covid Success Stories</span>
          <FaMedal style={{ marginLeft: "0.5rem", fontSize: "1.25rem" }} />
        </a>
      </div>
      <div className="footer">
        Developed By{" "}
        <a
          href="https://www.linkedin.com/in/ahmad-yar-khan-709870118/"
          target="_blank"
        >
          Ahmad Yar Khan
        </a>{" "}
        &{" "}
        <a
          href="https://www.linkedin.com/in/usama-bin-shahid-997589117/"
          target="_blank"
        >
          Usama Bin Shahid
        </a>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setMenuExpanded: (payload: boolean) =>
      dispatch({ type: StoreActionTypes.SetMenuExpanded, payload })
  };
};

const connector = connect(
  null,
  mapDispatchToProps
);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SideMenu);
