import React from "react";
import "./googleBtn.styles.scss";
import GoogleLogo from "../../assets/google-logo.png";

const GoogleBtn = () => {
  const handleSignUpWithGoogle = (e) => {
    e.preventDefault();
  };
  return (
    <button onClick={handleSignUpWithGoogle} className="auth-google-btn">
      <img src={GoogleLogo} alt="google-logo" />
      <span className="btn-text">Sign up with Google</span>
    </button>
  );
};

export default GoogleBtn;
