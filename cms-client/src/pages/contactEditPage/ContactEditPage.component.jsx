import React, { useEffect } from "react";
import "./contactEditPage.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import ViewContactDetail from "../../components/viewContactDetail/ViewContactDetail.component";
import UpdateContactDetail from "../../components/updateContactDetail/UpdateContactDetail.component";

const ContactEditPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  return (
    <div className="contact-edit-page">
      <div className="contact-edit-page-container">
        <div className="page-heading">Edit Contact</div>
        <div className="contact-edit-page-container-wrapper">
          <ViewContactDetail />
          <UpdateContactDetail />
        </div>
      </div>
    </div>
  );
};

export default ContactEditPage;
