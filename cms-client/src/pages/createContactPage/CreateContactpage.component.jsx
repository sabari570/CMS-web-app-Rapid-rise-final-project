import React, { useEffect, useState } from "react";
import "./createContactPage.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import CreateContactForm from "../../components/createContactForm/CreateContactForm.component";
import AuthProfileContainer from "../../components/authProfileContainer/AuthProfileContainer.component";
import ContactDefaultProfilePic from "../../assets/contact-default-profile.jpg";

const CreateContactpage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [contactAvatar, setContactAvatar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);
  return (
    currentUser && (
      <div className="create-contact-page">
        <div className="create-contact-page-wrapper">
          <div className="heading mobile">Create new contact</div>
          <div className="create-contact-page-wrapper-body">
            <div className="create-contact-image-container">
              <AuthProfileContainer
                type="file"
                defaultProfilePic={ContactDefaultProfilePic}
                userAvatar={contactAvatar}
                setUserAvatar={setContactAvatar}
                uploadIcon={<TbCameraPlus />}
                iconLabelClassName="add-contact-profile-icon"
                profileAvatarClassName="contact-profile-avatar-border"
              />
            </div>

            <CreateContactForm
              contactAvatar={contactAvatar}
              setContactAvatar={setContactAvatar}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default CreateContactpage;
