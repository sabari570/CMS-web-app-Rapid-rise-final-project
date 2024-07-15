import React from "react";
import "./loginpage.styles.scss";
import LoginBody from "../../components/loginBody/LoginBody.component";

const Loginpage = () => {
  return (
    <div className="loginpage">
      <div className="login-wrapper">
        <LoginBody />
      </div>
    </div>
  );
};

export default Loginpage;
