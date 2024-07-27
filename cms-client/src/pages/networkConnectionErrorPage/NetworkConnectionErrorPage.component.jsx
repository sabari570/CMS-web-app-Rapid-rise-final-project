import React from "react";
import "./networkConnectionErrorPage.styles.scss";
import NoNetworkAnimation from "../../assets/lottieAnimations/man-no-internet.json";
import Lottie from "lottie-react";

const NetworkConnectionErrorPage = () => {
  const handleReload = (e) => {
    window.location.reload();
  };
  return (
    <div className="network-connection-error">
      <div className="network-connection-error-wrapper">
        <div className="lottie-animation-container">
          <Lottie
            animationData={NoNetworkAnimation}
            loop={true}
            style={{ width: "300px", height: "300px", margin: "0 auto" }}
          />
        </div>
        <div className="no-network-content">
          <h2 className="no-network-title">Connection Lost</h2>
          <p className="no-network-subtitle">
            Please check your connection and try again
          </p>
          <button onClick={handleReload} className="no-network-reload-btn">
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkConnectionErrorPage;
