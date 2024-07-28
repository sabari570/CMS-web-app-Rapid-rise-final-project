import React, { useEffect } from "react";
import "./register.styles.scss";
import RegisterBody from "../../components/registerBody/RegisterBody.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";

const Registerpage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
  }, [currentUser]);
  return (
    !currentUser && (
      <div className="registerpage">
        <div className="register-wrapper">
          <RegisterBody />
        </div>
      </div>
    )
  );
};

export default Registerpage;
