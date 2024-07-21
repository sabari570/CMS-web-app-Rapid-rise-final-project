import React from "react";
import "./noRecordsImage.styles.scss";

const NoRecordsImage = ({ bgImage, message, subMessage }) => {
  return (
    <div className="no-records-image-wrapper">
      <div className="no-records-image-wrapper-container">
        <img src={bgImage} alt="no records image" />
      </div>
      <div className="no-records-message">{message}</div>
      <div className="no-records-submessage">{subMessage}</div>
    </div>
  );
};

export default NoRecordsImage;
