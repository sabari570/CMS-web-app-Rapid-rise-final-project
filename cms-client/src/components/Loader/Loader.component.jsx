import React from "react";
import "./loader.styles.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-text">Loading...</div>
      <div className="loader-bar"></div>
    </div>
  );
};

const LoadingModel = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Loader />
      </div>
    </div>
  );
};

export default LoadingModel;
