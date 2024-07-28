import React from "react";
import "./googleBtn.styles.scss";
import GoogleLogo from "../../assets/google-logo.png";
import { CMS_BACKEND_BASEURL } from "../../constants/appConstants";

const GoogleBtn = () => {
  const handleSignUpWithGoogle = (e) => {
    e.preventDefault();
    window.open(`${CMS_BACKEND_BASEURL}/auth/google`, "_self");
  };
  return (
    <button
      type="button"
      onClick={handleSignUpWithGoogle}
      className="auth-google-btn"
    >
      <img src={GoogleLogo} alt="google-logo" />
      <span className="btn-text">Sign up with Google</span>
    </button>
  );
};

export default GoogleBtn;
