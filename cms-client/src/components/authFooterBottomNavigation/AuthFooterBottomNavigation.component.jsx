import React from "react";
import { Link } from "react-router-dom";

const AuthFooterBottomNavigation = ({
  textLabel,
  btnText,
  navigationRoute,
}) => {
  return (
    <div className="auth-bottom-navigation-footer">
      <p>{textLabel}</p>
      <Link className="navigation-btn" to={navigationRoute}>
        {btnText}
      </Link>
    </div>
  );
};

export default AuthFooterBottomNavigation;
