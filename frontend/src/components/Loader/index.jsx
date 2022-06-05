import React from "react";
import "./index.css";
import LoaderIcon from "../../assets/loader.gif";
import Popup from "reactjs-popup";

function Index() {
  return (
    <div className="loader">
      <div className="loader-container">
        <img className="loading-icon" src={LoaderIcon} />
        <div>Please Confirm The Transaction</div>
      </div>
    </div>
  );
}

export default Index;
