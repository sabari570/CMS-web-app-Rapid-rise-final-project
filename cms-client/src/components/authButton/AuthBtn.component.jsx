import React from "react";
import "./authBtn.styles.scss";

const AuthBtn = ({ buttonText, onClick }) => {
  return (
    <button
      type="button"
      className="auth-btn"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default AuthBtn;
