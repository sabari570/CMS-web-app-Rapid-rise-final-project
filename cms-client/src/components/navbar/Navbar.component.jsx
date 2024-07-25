import React, { useEffect, useRef, useState } from "react";
import "./navbar.styles.scss";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { FaUserCog } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { handleImageUrl } from "../../utils/helperFunctions";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [isToggleDropdown, setToggleDropdown] = useState(false);
  const [navState, setNavState] = useState(false);
  const profileContainerRef = useRef(null);
  const { logout } = useLogout();

  const handleToggleDropdown = (e) => {
    setToggleDropdown((prev) => !prev);
  };

  const toggleNavbar = (e) => {
    e.stopPropagation();
    setNavState((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(e.target)
      ) {
        setToggleDropdown(false);
      }

      const navLinks = document.querySelector(".nav-link");
      const toggleBtn = document.querySelector(".toogle-container");

      if (navLinks && toggleBtn && !navLinks.contains(event.target)) {
        setNavState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async (e) => {
    console.log("Logout clciked");
    await logout();
  };

  const handleProfileDropdownAfterClick = (e) => {
    setToggleDropdown(false);
  };

  const handleSideDrawerAfterClick = (e) => {
    console.log("Side drawer navstate: ", navState);
    if (navState) setNavState(false);
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-wrapper">
        <div className="navbar-wrapper-container">
          <div className="cms-logo">
            <NavLink to="/">
              <h2 className="app-name-first">Connect</h2>
              <h2 className="app-name-second">EZ</h2>
            </NavLink>
          </div>

          <div className="toogle-container">
            <div className="toogle">
              {navState ? (
                <MdClose className={`nav-icon open`} onClick={toggleNavbar} />
              ) : (
                <GiHamburgerMenu
                  className="nav-icon close"
                  onClick={toggleNavbar}
                />
              )}
            </div>
          </div>

          <ul className={`nav-link ${navState && "active-hidden"}`}>
            <li className={`nav-link-item ${navState && "open"}`}>
              <NavLink to="/" onClick={handleSideDrawerAfterClick}>
                Dashboard
              </NavLink>
            </li>

            <li className={`nav-link-item ${navState && "open"}`}>
              <NavLink to="contacts" onClick={handleSideDrawerAfterClick}>
                Contacts
              </NavLink>
            </li>

            <li
              className={`nav-link-item mobile-screen-routes ${
                navState && "open"
              }`}
            >
              <NavLink to="profile" onClick={handleSideDrawerAfterClick}>
                Profile
              </NavLink>
            </li>
            <li
              className={`nav-link-item mobile-screen-routes ${
                navState && "open"
              }`}
            >
              <Link onClick={handleLogout}>Logout</Link>
            </li>

            <li className="nav-link-item" ref={profileContainerRef}>
              <div
                className="nav-link-item-profile-pic-container"
                onClick={handleToggleDropdown}
              >
                <img
                  crossOrigin="anonymous"
                  src={handleImageUrl(currentUser.profilePic)}
                  alt="user-avatar"
                />
              </div>

              <ul className={`dropdown-menu ${isToggleDropdown && "active"}`}>
                <li className="dropdown-menu-item">
                  <NavLink
                    to="profile"
                    onClick={handleProfileDropdownAfterClick}
                  >
                    <span>Profile</span>
                    <FaUserCog className="nav-icon" />
                  </NavLink>
                </li>
                <div className="seperator" />
                <li className="dropdown-menu-item">
                  <Link onClick={handleLogout}>
                    Logout
                    <TbLogout className="nav-icon" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {navState && <div className="overlay"></div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
