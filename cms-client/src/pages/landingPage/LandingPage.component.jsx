import React, { useEffect, useState } from "react";
import "./landingPage.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Link, useNavigate } from "react-router-dom";
import AuthFormHeaderLogo from "../../components/authFormHeaderLogo/AuthFormHeaderLogo.component";
import LandingPageAnimation from "../../assets/lottieAnimations/landing-hero.json";
import Lottie from "lottie-react";
import useIsMobile from "../../hooks/useIsMobile";

const LandingPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const isLaptop = useIsMobile(970);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
    else setIsLoaded(true);
  }, [currentUser]);
  return (
    !currentUser && (
      <div className="landing-page">
        <div className="landing-page-wrapper">
          <div className="landing-page-header">
            <AuthFormHeaderLogo />
          </div>
          <div className="landing-page-content">
            <div className={`left-side ${isLoaded ? "slide-up" : ""}`}>
              <h1 className="landing-page-title">
                Welcome to Connect<span>EZ</span>
              </h1>
              <p className="landing-page-description">
                Manage your contacts efficiently with ConnectEZ. Our tool helps
                you keep all your contacts organized and easily accessible,
                ensuring you never lose touch.
              </p>
              <div className="landing-page-buttons">
                <Link to="/register" className="signup-btn">
                  Sign Up
                </Link>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </div>
            </div>

            <div className={`right-side-hero ${isLoaded ? "slide-in" : ""}`}>
              <Lottie
                animationData={LandingPageAnimation}
                loop={true}
                style={{
                  width: isLaptop ? "350px" : "450px",
                  height: isLaptop ? "350px" : "450px",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LandingPage;
