import React, { useState } from "react";
import "./authProfileContainer.styles.scss";
import DefaultProfilePic from "../../assets/default-profile-pic.png";
import { TbEditCircle } from "react-icons/tb";

const AuthProfileContainer = ({
  type,
  defaultProfilePic = DefaultProfilePic,
  userAvatar,
  setUserAvatar,
  uploadIcon,
  iconLabelClassName = "",
  profileAvatarClassName = "",
}) => {
  const [userAvatarImage, setUserAvatarImage] = useState();

  const handleUserAvatarChange = (e) => {
    const file = e.target.files[0];
    setUserAvatarImage(URL.createObjectURL(file));
    setUserAvatar(file);
  };
  return (
    <div className="avatar-wrapper">
      <div className={`profile-avatar ${profileAvatarClassName}`}>
        {userAvatar ? (
          <img
            crossOrigin="anonymous"
            src={userAvatarImage}
            alt="user-profile-pic"
          />
        ) : (
          <img crossOrigin="anonymous" src={defaultProfilePic} />
        )}
      </div>

      <input
        type={type}
        id="avatar"
        accept="png, jpg, jpeg"
        onChange={handleUserAvatarChange}
      />
      <label htmlFor="avatar" className={iconLabelClassName}>
        {uploadIcon ? uploadIcon : <TbEditCircle />}
      </label>
    </div>
  );
};

export default AuthProfileContainer;
