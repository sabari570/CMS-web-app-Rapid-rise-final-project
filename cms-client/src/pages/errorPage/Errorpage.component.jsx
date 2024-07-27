import React from "react";
import "./errorpage.styles.scss";
import RobotAnimatedJson from "../../assets/lottieAnimations/robot.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

const Errorpage = () => {
  const isMobile = useIsMobile(650);
  return (
    <div className="error-page">
      <div className="error-page-wrapper">
        <div className="error-page-header-container">
          <h2 className="error-title">We lost this page</h2>
          <div className="subtitle-wrapper">
            <p className="error-subtitle">
              We searched high and low but couldn't find what you're looking
              for.
              <br /> Let's find a better place for you to go.
            </p>
          </div>
          <Link to="/" className="error-footer-btn">
            Go to homepage
          </Link>
        </div>
        <div className="error-page-lottie-container">
          <Lottie
            animationData={RobotAnimatedJson}
            loop={true}
            style={{
              width: isMobile ? "200px" : "300px",
              height: isMobile ? "200px" : "300px",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Errorpage;
