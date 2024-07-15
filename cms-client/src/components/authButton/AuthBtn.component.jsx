import React from "react";
import "./authBtn.styles.scss";

const AuthBtn = ({ buttonText, isSubmitting }) => {
  return (
    <button className="auth-btn" disabled={isSubmitting}>
      {isSubmitting ? "Loading..." : buttonText}
    </button>
  );
};

export default AuthBtn;
