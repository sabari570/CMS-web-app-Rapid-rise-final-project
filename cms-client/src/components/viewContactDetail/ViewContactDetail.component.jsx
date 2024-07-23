import React from "react";
import "./viewContactDetail.styles.scss";
import { BiIdCard } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { handleImageUrl } from "../../utils/helperFunctions";
import AccountDetailItem from "./AccountDetailItem.component";

const ViewContactDetail = ({ selectedContact }) => {
  const accountDetailItems = [
    {
      icon: <FaRegUser className="contact-detail-icon" />,
      value: selectedContact.firstName,
    },
    {
      icon: <BiIdCard className="contact-detail-icon" />,
      value: selectedContact.lastName,
    },
    {
      icon: <BsBuildings className="contact-detail-icon" />,
      value: selectedContact.companyName,
    },
  ];

  const communicationDetailItems = [
    {
      icon: <MdOutlinePhoneIphone className="contact-detail-icon" />,
      value: selectedContact.phone,
    },
    {
      icon: <IoLocationOutline className="contact-detail-icon" />,
      value: selectedContact.address,
    },
  ];
  return (
    <div className="view-contact-detail">
      <div className="view-contact-detail-wrapper">
        <div className="contact-profile-container">
          <div className="contact-avatar-detail-container">
            <div className="contact-avatar-container">
              <img
                crossOrigin="anonymous"
                src={handleImageUrl(selectedContact.profilePic)}
                alt="contact-avatar"
              />
            </div>
            <div className="contact-profile-start-detail">
              <p className="contact-name">
                {`${selectedContact.firstName} ${selectedContact.lastName}`}
              </p>
              <p className="contact-status">{selectedContact.status}</p>
            </div>
          </div>

          <div>
            <AccountDetailItem
              detailHeading={"Account Details"}
              detailItems={accountDetailItems}
            />

            <AccountDetailItem
              detailHeading={"Contact Details"}
              detailItems={communicationDetailItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContactDetail;
