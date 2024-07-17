import React from "react";
import "./layout.styles.scss";
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
        <div className="app-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
