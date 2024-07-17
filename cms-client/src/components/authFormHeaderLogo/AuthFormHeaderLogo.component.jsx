import React from "react";
import Logo from "../../assets/cms-logo.png";

const AuthFormHeaderLogo = () => {
  return (
    <div className="logo-section">
      <img src={Logo} alt="CMS-logo" />
      <span className="web-app-name">CMS</span>
    </div>
  );
};

export default AuthFormHeaderLogo;
