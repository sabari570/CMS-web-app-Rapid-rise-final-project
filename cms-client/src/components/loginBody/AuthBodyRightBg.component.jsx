import React from "react";

const AuthBodyRightBg = ({ LoginRightBg }) => {
  return (
    <div className="auth-body-right">
      <div className="image-container">
        <img loading="lazy" src={LoginRightBg} alt="login-right-image" />
      </div>
    </div>
  );
};

export default AuthBodyRightBg;
