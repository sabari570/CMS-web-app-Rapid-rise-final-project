import React, { useEffect, useRef, useState } from "react";
import "./updateContactDetailForm.styles.scss";
import AuthInputField from "../inputField/authInputField.component";
import PhoneNumberField from "../phoneNumberField/PhoneNumberField.component";
import CmsCustomDropdown from "../cmsCustomDropdown/CmsCustomDropdown.component";
import CmsDropdownItem from "../cmsCustomDropdown/cmsDropdownItem.component";

const UpdateContactDetailForm = ({
  register,
  trigger,
  setValue,
  isValid,
  errors,
  clearErrors,
  phoneValue,
  selectedStatus,
  setSelectedStatus,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cmsDropdownRef = useRef();

  const statusContent = ["Employee", "Trainee"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cmsDropdownRef.current &&
        !cmsDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cmsDropdownRef]);

  const handleStatusSelect = (status) => {
    setValue("status", status);
    setSelectedStatus(status);
    setIsDropdownOpen(false);
    clearErrors("status");
  };
  return (
    <form className="update-contact-detail-form">
      <AuthInputField
        fieldType="firstName"
        type="text"
        labelName="First Name"
        placeholder="John"
        register={register}
        errors={errors.firstName}
        trigger={trigger}
        isValid={isValid}
      />
      <AuthInputField
        fieldType="lastName"
        type="text"
        labelName="Last Name"
        placeholder="Doe"
        register={register}
        errors={errors.lastName}
        trigger={trigger}
        isValid={isValid}
      />
      <AuthInputField
        fieldType="companyName"
        type="text"
        labelName="Company Name"
        placeholder="Innovature"
        register={register}
        errors={errors.companyName}
        trigger={trigger}
        isValid={isValid}
      />
      <PhoneNumberField
        fieldType="phone"
        phoneLabelText="Phone"
        placeholderText="+91 9023230922"
        register={register}
        errors={errors.phone}
        trigger={trigger}
        isValid={isValid}
        setValue={setValue}
        phoneNumberValue={phoneValue}
      />
      <div ref={cmsDropdownRef}>
        <CmsCustomDropdown
          placeholderText="Status"
          btnText={selectedStatus}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownTextClassName="cms-dropdown-value-text"
          errors={errors.status}
          labelClassName={`cms-dropdown-btn-label ${
            selectedStatus ? "active" : null
          }`}
          content={
            <>
              {statusContent.map((item, index) => (
                <CmsDropdownItem
                  key={index}
                  onClick={() => handleStatusSelect(item)}
                >
                  {item}
                </CmsDropdownItem>
              ))}
            </>
          }
        />
      </div>
      <AuthInputField
        fieldType="address"
        type="text"
        labelName="Address"
        placeholder="1234 Elm Street, Apt 567"
        register={register}
        errors={errors.address}
        trigger={trigger}
        isValid={isValid}
      />
    </form>
  );
};

export default UpdateContactDetailForm;
