import React, { useEffect, useRef, useState } from "react";
import "./createContactForm.styles.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../utils/formSchemas";
import AuthInputField from "../inputField/authInputField.component";
import CmsCustomDropdown from "../cmsCustomDropdown/CmsCustomDropdown.component";
import CmsDropdownItem from "../cmsCustomDropdown/cmsDropdownItem.component";
import PhoneNumberField from "../phoneNumberField/PhoneNumberField.component";
import AuthBtn from "../authButton/AuthBtn.component";
import useCreateContact from "../../hooks/useCreateContact";

const CreateContactForm = ({ contactAvatar, setContactAvatar }) => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { isValid, errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });
  const [selectedStatus, setSelectedStatus] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cmsDropdownRef = useRef();
  const { createContact } = useCreateContact();

  const statusContent = ["Employee", "Trainee"];

  const onSubmit = async (data) => {
    console.log("Contact data: ", data);
    console.log("Contact profile URL: ", contactAvatar);

    const contactFormData = new FormData();
    Object.keys(data).forEach((key) => {
      contactFormData.append(key, data[key]);
    });
    contactFormData.append("profilePic", contactAvatar);
    await createContact(contactFormData);
    reset();
    setContactAvatar(null);
    clearErrors();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };

  const handleStatusSelect = (status) => {
    setValue("status", status);
    setSelectedStatus(status);
    setIsDropdownOpen(false);
    clearErrors("status");
  };

  useEffect(() => {
    const handler = (event) => {
      if (
        cmsDropdownRef.current &&
        !cmsDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [cmsDropdownRef]);

  return (
    <form className="create-contact-form">
      <div className="heading">Create new contact</div>
      <div className="create-contact-form-name">
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
      </div>

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
      <div className="create-contact-status-dropdown" ref={cmsDropdownRef}>
        <div className="create-contact-phone-status">
          <PhoneNumberField
            fieldType="phone"
            phoneLabelText="Phone"
            placeholderText="+91 9023230922"
            register={register}
            errors={errors.phone}
            trigger={trigger}
            isValid={isValid}
            setValue={setValue}
          />
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
      <AuthBtn
        onClick={handleFormSubmit}
        btnClassName="create-contact-btn"
        buttonText={"Create"}
      />
    </form>
  );
};

export default CreateContactForm;
