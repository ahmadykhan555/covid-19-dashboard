import React from "react";
import "./Footer.scss";
import moment from "moment";

const Footer: React.FC<any> = () => {
  return (
    <div className="footer">
      <div className="footer-inner">
        <h4 className="copyright-info">
          © {moment().year()} All rights reserved
        </h4>
        <ul className="links">
          <li>About</li>
          <li>Legal</li>
          <li>Admin Panel</li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
