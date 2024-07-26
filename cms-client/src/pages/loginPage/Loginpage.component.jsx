import React, { useEffect } from "react";
import "./loginpage.styles.scss";
import LoginBody from "../../components/loginBody/LoginBody.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector.js";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);
  return (
    !currentUser && (
      <div className="loginpage">
        <div className="login-wrapper">
          <LoginBody />
        </div>
      </div>
    )
  );
};

export default Loginpage;
