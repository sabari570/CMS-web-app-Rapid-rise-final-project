import React, { useEffect, useRef, useState } from "react";
import "./userAvatarContainer.styles.scss";
import { FaPencilAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp, IoCloseSharp } from "react-icons/io5";

const UserAvatarContainer = ({
  userAvatar,
  setUserAvatar,
  imageUrl,
  onClick,
}) => {
  const [userAvatarImage, setUserAvatarImage] = useState();
  const [isEditing, setIsEditing] = useState(false);
  // For resetting the input field after selecting an image
  const fileInputRef = useRef(null);

  const handleUserAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserAvatarImage(URL.createObjectURL(file));
      setUserAvatar(file);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setUserAvatarImage(null);
    setUserAvatar(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    if (userAvatar == null) setIsEditing(false);
  }, [userAvatar]);

  console.log("User avatar: ", userAvatar);
  console.log("User avatar image: ", userAvatarImage);
  return (
    <div className="user-avatar-image-container">
      <div className="user-avatar-image-container-wrapper">
        <div className="user-avatar-image-wrapper">
          <img
            crossOrigin="anonymous"
            src={userAvatarImage || imageUrl}
            alt="user-profile-pic"
          />
          <input
            type="file"
            id="avatar"
            ref={fileInputRef}
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleUserAvatarChange}
          />
        </div>
        <label htmlFor="avatar" className={isEditing ? "hidden" : ""}>
          <FaPencilAlt className="profile-avatar-edit-icon" />
        </label>
        <div className={`user-avatar-actions ${isEditing ? "active" : ""}`}>
          <div className="profile-avatar-done-icon" onClick={onClick}>
            <IoCheckmarkDoneSharp />
          </div>
          <div
            className="profile-avatar-cancel-icon cancel"
            onClick={handleCancel}
          >
            <IoCloseSharp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatarContainer;
