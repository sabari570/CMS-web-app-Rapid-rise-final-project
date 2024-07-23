import React, { useState } from "react";
import "./updateContactDetailAvatar.styles.scss";
import AuthBtn from "../authButton/AuthBtn.component";
import UserAvatarContainer from "../userAvatarContainer/UserAvatarContainer.component";
import { handleImageUrl } from "../../utils/helperFunctions";
import useUpdateContactAvatar from "../../hooks/useUpdateContactAvatar";

const UpdateContactDetailAvatar = ({
  contactId,
  handleFormSubmit,
  imageUrl,
}) => {
  const [userAvatar, setUserAvatar] = useState(null);
  const { loading, updateContactAvatar } = useUpdateContactAvatar();

  const handleUpdateImage = async (e) => {
    console.log("now call the update api with the image object");
    const formData = new FormData();
    formData.append("profilePic", userAvatar);
    await updateContactAvatar(contactId, formData);
    setUserAvatar(null);
  };
  return (
    <div className="update-contact-detail-avatar">
      <div className="update-contact-detail-avatar-wrapper">
        <div className="contact-profile-avatar-container">
          <UserAvatarContainer
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            imageUrl={handleImageUrl(imageUrl)}
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
