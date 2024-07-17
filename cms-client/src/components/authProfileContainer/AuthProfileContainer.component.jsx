import React, { useState } from "react";
import "./authProfileContainer.styles.scss";
import DefaultProfilePic from "../../assets/default-profile-pic.png";
import { TbEditCircle } from "react-icons/tb";

const AuthProfileContainer = ({ type, userAvatar, setUserAvatar }) => {
  const [userAvatarImage, setUserAvatarImage] = useState();

  const handleUserAvatarChange = (e) => {
    const file = e.target.files[0];
    setUserAvatarImage(URL.createObjectURL(file));
    setUserAvatar(file);
  };
  return (
    <div className="avatar-wrapper">
      <div className="profile-avatar">
        {userAvatar ? (
          <img src={userAvatarImage} alt="user-profile-pic" />
        ) : (
          <img src={DefaultProfilePic} />
        )}
      </div>

      <input
        type={type}
        id="avatar"
        accept="png, jpg, jpeg"
        onChange={handleUserAvatarChange}
      />
      <label htmlFor="avatar">
        <TbEditCircle />
      </label>
    </div>
  );
};

export default AuthProfileContainer;
