import React, { useEffect } from "react";
import "./homepage.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
    else navigate("/login");
  }, [currentUser]);

  return <div className="homepage">Homepage</div>;
};

export default Homepage;
