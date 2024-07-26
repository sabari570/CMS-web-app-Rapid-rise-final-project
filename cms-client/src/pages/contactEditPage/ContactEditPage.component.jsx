import React, { useEffect } from "react";
import "./contactEditPage.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectSelectedContact } from "../../store/contact/contact.selector.js";
import { useNavigate, useParams } from "react-router-dom";
import ViewContactDetail from "../../components/viewContactDetail/ViewContactDetail.component";
import UpdateContactDetail from "../../components/updateContactDetail/UpdateContactDetail.component";
import useFetchContactDetail from "../../hooks/useFetchContactDetail";
import { setSelectedContact } from "../../store/contact/contact.reducer.js";

const ContactEditPage = () => {
  const { id } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const selectedContact = useSelector(selectSelectedContact);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchContactDetail } = useFetchContactDetail();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  const handleFetchContactData = async () => {
    await fetchContactDetail(id);
  };

  useEffect(() => {
    handleFetchContactData();

    return () => {
      console.log("Cleaned selected contact");
      dispatch(setSelectedContact(null));
    };
  }, []);

  console.log("Selected contact: ", selectedContact);

  return (
    currentUser && (
      <div className="contact-edit-page">
        <div className="contact-edit-page-container">
          <div className="page-heading">Edit Contact</div>
          {selectedContact && (
            <div className="contact-edit-page-container-wrapper">
              <ViewContactDetail selectedContact={selectedContact} />
              <UpdateContactDetail />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ContactEditPage;
