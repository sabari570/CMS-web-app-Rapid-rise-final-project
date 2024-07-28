import React, { useEffect, useState } from "react";
import "./splashScreen.styles.scss";
import { useDispatch } from "react-redux";
import { setShowSplash } from "../../store/splash/splash.reducer";

const SplashScreen = () => {
  const dispatch = useDispatch();

  const [animationState, setAnimationState] = useState({
    showSplash: true,
    firstPartActive: false,
    firstPartFade: false,
    secondPartActive: false,
    secondPartFade: false,
  });

  useEffect(() => {
    const showPart = (part) => {
      setTimeout(
        () => {
          setAnimationState((prev) => ({
            ...prev,
            [part + "Active"]: true,
          }));
        },
        part === "firstPart" ? 400 : 800
      );
    };

    const hidePart = (part) => {
      setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          [part + "Fade"]: true,
        }));
      }, 2000 + (part === "firstPart" ? 0 : 50));
    };

    showPart("firstPart");
    showPart("secondPart");

    hidePart("firstPart");
    hidePart("secondPart");

    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        showSplash: false,
      }));
    }, 2000);

    setTimeout(() => {
      dispatch(setShowSplash(false));
    }, 2800);
  }, [dispatch]);

  return (
    <div
      className={`splash-screen ${!animationState.showSplash ? "hide" : ""}`}
    >
      <h1 className="logo-header">
        <span
          className={`first-part ${
            animationState.firstPartActive ? "active" : ""
          } ${animationState.firstPartFade ? "fade" : ""}`}
        >
          Connect
        </span>
        <span
          className={`second-part ${
            animationState.secondPartActive ? "active" : ""
          } ${animationState.secondPartFade ? "fade" : ""}`}
        >
          EZ
        </span>
      </h1>
    </div>
  );
};

export default SplashScreen;
