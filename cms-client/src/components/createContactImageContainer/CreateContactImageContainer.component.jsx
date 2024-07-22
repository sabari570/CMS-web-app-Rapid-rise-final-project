import React from "react";
import DefaultProfilePic from "../../assets/default-profile-pic.png";
import { FaUpload } from "react-icons/fa6";

const CreateContactImageContainer = () => {
  const handleContactAvatarChange = () => {};
  return (
    <div className="create-contact-image-container">
      <div className="image-icon-group">
        <div className="create-contact-image-wrapper">
          <img
            crossOrigin="anonymous"
            src={DefaultProfilePic}
            alt="contact-avatar"
          />
          <input
            type="file"
            id="avatar"
            accept="png, jpg, jpeg"
            onChange={handleContactAvatarChange}
          />
        </div>
        <label htmlFor="avatar">
          <button className="contact-avatar-upload-btn">Upload</button>
        </label>
      </div>
    </div>
  );
};

export default CreateContactImageContainer;
