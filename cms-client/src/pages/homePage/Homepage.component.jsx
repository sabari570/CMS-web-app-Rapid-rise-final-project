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

  const handleDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString();
  };
  return (
    <div>
      Homepage
      {currentUser && (
        <div>
          <p>Original date: {currentUser.dob}</p>
          <p>Converted date: {handleDate(currentUser.dob)}</p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
