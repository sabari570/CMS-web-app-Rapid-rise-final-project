import React from "react";
import "./register.styles.scss";
import RegisterBody from "../../components/registerBody/RegisterBody.component";

const Registerpage = () => {
  return (
    <div className="registerpage">
      <div className="register-wrapper">
        <RegisterBody />
      </div>
    </div>
  );
};

export default Registerpage;
