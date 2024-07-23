import React, { useRef, useState } from "react";
import "./cmsCustomDropdown.styles.scss";
import { FaChevronDown } from "react-icons/fa";

const CmsCustomDropdown = ({
  btnText,
  content,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownTextClassName = "",
  placeholderText,
  errors,
}) => {
  const [dropdownTop, setDropdownTop] = useState(0);
  const buttonRef = useRef();
  const contentRef = useRef();

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      const spaceRemaining =
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;

      const contentHeight = contentRef.current.clientHeight;

      const topPosition =
        spaceRemaining > contentHeight
          ? null
          : -(contentHeight - spaceRemaining);

      setDropdownTop(topPosition);
    }
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div className="cms-custom-dropdown-wrapper">
      <div
        className={`cms-dropdown-button ${
          isDropdownOpen || btnText ? "dropdown-open" : ""
        } ${errors ? "cms-dropdown-error" : ""}`}
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        <label
          className={`dropdown-text-label ${
            isDropdownOpen || btnText ? "raise-up" : ""
          } ${errors ? "cms-dropdown-label-error" : ""}`}
        >
          {placeholderText}
        </label>
        <span className={dropdownTextClassName}>{btnText}</span>
        <span
          className={`cms-dropdown-icon ${
            isDropdownOpen ? "dropdown-icon-open" : ""
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      {errors && <p className="error-message">{errors.message}</p>}

      <div
        className={`cms-dropdown-content ${
          isDropdownOpen ? "content-open" : ""
        }`}
        style={{ top: dropdownTop ? `${dropdownTop}px` : "100%" }}
        ref={contentRef}
      >
        {content}
      </div>
    </div>
  );
};

export default CmsCustomDropdown;
