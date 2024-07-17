import React, { useEffect, useRef, useState } from "react";
import "./navbar.styles.scss";
import { Link } from "react-router-dom";
import { CMS_IMAGE_BASEURL } from "../../constants/appConstants";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { FaUserCog } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [isToggleDropdown, setToggleDropdown] = useState(false);
  const profileContainerRef = useRef(null);

  const handleToggleDropdown = (e) => {
    console.log("Clicked");
    setToggleDropdown((prev) => !prev);
  };

  const handleImageUrl = (profilePicUrl) => {
    if (profilePicUrl.startsWith("http")) {
      return profilePicUrl;
    } else {
      return `${CMS_IMAGE_BASEURL + profilePicUrl}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(e.target)
      ) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-wrapper">
        <div className="navbar-wrapper-container">
          <div className="cms-logo">
            <Link to="/">
              <h2 className="app-name-first">Connect</h2>
              <h2 className="app-name-second">EZ</h2>
            </Link>
          </div>

          <ul className="nav-link">
            <li className="nav-link-item">
              <Link to="/">Dashboard</Link>
            </li>

            <li className="nav-link-item">
              <Link to="contacts">Contacts</Link>
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
                  <Link to="profile">
                    <span>Profile</span>
                    <FaUserCog className="nav-icon" />
                  </Link>
                </li>
                <div className="seperator" />
                <li className="dropdown-menu-item">
                  <Link>
                    Logout
                    <TbLogout className="nav-icon" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;