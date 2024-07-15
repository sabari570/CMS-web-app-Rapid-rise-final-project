import React from "react";
import Navbar from "../navbar/Navbar.component";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Layout = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="layout">
      <div className="layout-wrapper">
        {currentUser && <Navbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
