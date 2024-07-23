import React from "react";
import "./contactCard.styles.scss";
import { handleImageUrl } from "../../utils/helperFunctions";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const contactDivs = [
    { title: "Firstname", keyName: "firstName" },
    { title: "Lastname", keyName: "lastName" },
    { title: "Address", keyName: "address" },
    { title: "Company Name", keyName: "companyName" },
    { title: "Status", keyName: "status", divClassName: "contact-status" },
    { title: "Phone", keyName: "phone" },
  ];

  const handleNavigation = (e, path) => {
    console.log("Path:", path);
    navigate(path);
  };
  return (
    <div className="contact-card">
      <div className="contact-card-profile-pic">
        <img
          crossOrigin="anonymous"
          src={handleImageUrl(contact.profilePic)}
          alt="contact-profile"
        />
      </div>
      <div className="contact-card-details">
        {contactDivs.map((contactDiv, index) => (
          <div
            key={index}
            className={`contact-info ${
              contactDiv.title === "Address" && "address-field"
            }`}
          >
            <p className="contact-info-title">{contactDiv.title}: </p>
            <p
              className={`contact-info-text ${
                contactDiv.divClassName ? contactDiv.divClassName : ""
              } ${contact[contactDiv.keyName].toLowerCase()}`}
            >
              {contact[contactDiv.keyName]}
            </p>
          </div>
        ))}

        <div className="contact-card-details-footer-btns">
          <button
            className="contact-card-edit-btn"
            onClick={(e) => handleNavigation(e, `/edit-contact/${contact._id}`)}
          >
            Edit
          </button>
          <button className="contact-card-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
