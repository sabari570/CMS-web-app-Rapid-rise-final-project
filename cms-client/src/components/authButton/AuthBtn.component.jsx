import React from "react";
import "./authBtn.styles.scss";

const AuthBtn = ({ buttonText, isSubmitting, onClick }) => {
  return (
    <button
      type="button"
      className="auth-btn"
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? "Loading..." : buttonText}
    </button>
  );
};

export default AuthBtn;
