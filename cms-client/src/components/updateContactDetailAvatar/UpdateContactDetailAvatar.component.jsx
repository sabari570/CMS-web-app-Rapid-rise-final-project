import React, { useState } from "react";
import "./updateContactDetailAvatar.styles.scss";
import AuthBtn from "../authButton/AuthBtn.component";
import UserAvatarContainer from "../userAvatarContainer/UserAvatarContainer.component";
import { handleImageUrl } from "../../utils/helperFunctions";

const UpdateContactDetailAvatar = ({ handleFormSubmit }) => {
  const [userAvatar, setUserAvatar] = useState(null);
  const handleUpdateImage = (e) => {
    console.log("now call the update api with the image object");
    setUserAvatar(null);
  };
  return (
    <div className="update-contact-detail-avatar">
      <div className="update-contact-detail-avatar-wrapper">
        <div className="contact-profile-avatar-container">
          <UserAvatarContainer
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            imageUrl={handleImageUrl("1720675640268-avatar2.jpg")}
            onClick={handleUpdateImage}
          />
        </div>

        <AuthBtn
          buttonText={"Update"}
          btnClassName="contact-profile-update-btn"
          onClick={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default UpdateContactDetailAvatar;
