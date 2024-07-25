import React from "react";
import "./dashboardRecentContacts.styles.scss";
import { handleImageUrl } from "../../utils/helperFunctions";
import { MdOutlineVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DashboardRecentContacts = ({ recentContacts }) => {
  const navigate = useNavigate();

  const handleNavigation = (e, contactId) => {
    console.log(contactId);
    navigate(`/edit-contact/${contactId}`);
  };
  return (
    <div className="dashboard-recent-contacts">
      <div className="dashboard-recent-contacts-wrapper">
        <div className="recent-contacts-heading">Recently added contacts</div>
        <div className="contacts-list">
          {recentContacts.map((contact, index) => (
            <div key={index} className="recent-contact-card">
              <div className="contact-image-container">
                <img
                  crossOrigin="anonymous"
                  src={handleImageUrl(contact.profilePic)}
                  alt="contact-avatar"
                />
              </div>
              <div className="detail-btn-group">
                <div className="contact-details-col">
                  <p className="contact-name">{`${contact.firstName} ${contact.lastName}`}</p>
                  <p className="contact-status">{contact.status}</p>
                </div>
                <div className="contact-display-btn">
                  <button onClick={(e) => handleNavigation(e, contact._id)}>
                    <MdOutlineVisibility className="recnt-contacts-icon" />
                    Display
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRecentContacts;
