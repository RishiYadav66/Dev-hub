import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <PublicIcon />
            <Link to="/">Dev Central</Link>
          </div>
          <div style={{ marginLeft: "25px" }} className="sidebar-option">
            <Link to="/">Tags</Link>
          </div>
          <div style={{ marginLeft: "25px" }} className="sidebar-option">
            <Link to="/">Users</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
