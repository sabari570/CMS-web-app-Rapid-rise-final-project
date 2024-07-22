import React from "react";
import "./authBtn.styles.scss";

const AuthBtn = ({ buttonText, onClick, btnClassName = "" }) => {
  return (
    <button
      type="button"
      className={`auth-btn ${btnClassName}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default AuthBtn;
