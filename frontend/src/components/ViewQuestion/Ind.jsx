import React from "react";
import Sidebar from "../Stackoverflow/Sidebar";
import "../Stackoverflow/index.css";
import MainQuestion from "./MainQuestion";
const Ind = () => {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <MainQuestion />
      </div>
    </div>
  );
};

export default Ind;
