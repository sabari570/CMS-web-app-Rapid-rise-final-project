import React from "react";
import "./contactsPageHeader.styles.scss";
import { HiFilter } from "react-icons/hi";
import { IoChevronUp } from "react-icons/io5";
import { BiSortUp } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import ContactPageButton from "../contactPageButton/ContactPageButton.component";

const ContactsPageHeader = () => {
  return (
    <div className="contacts-page-header-wrapper">
      <ContactPageButton
        btnClassName="button-wrapper"
        preIcon={<BiSortUp className="button-wrapper-pre-icon" />}
        btnText="Sort by"
        postIcon={<IoChevronUp className="button-wrapper-post-icon" />}
      />

      <ContactPageButton
        btnClassName="button-wrapper"
        preIcon={<HiFilter className="button-wrapper-pre-icon" />}
        btnText="Filters"
        postIcon={<IoChevronUp className="button-wrapper-post-icon" />}
      />

      <ContactPageButton
        btnClassName="button-wrapper create-btn"
        preIcon={<IoIosAdd className="button-wrapper-pre-icon create-btn" />}
        btnText="New Contact"
      />
    </div>
  );
};

export default ContactsPageHeader;
