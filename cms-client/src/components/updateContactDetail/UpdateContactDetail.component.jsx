import React, { useState } from "react";
import "./updateContactDetail.styles.scss";
import UpdateContactDetailForm from "../updateContactDetailForm/UpdateContactDetailForm.component";
import UpdateContactDetailAvatar from "../updateContactDetailAvatar/UpdateContactDetailAvatar.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../utils/formSchemas";

const UpdateContactDetail = () => {
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
  const [phoneValue, setPhoneValue] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  const onSubmit = async (data) => {
    console.log("Contact data: ", data);
    reset();
    setPhoneValue(null);
    setSelectedStatus(null);
    clearErrors();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };
  return (
    <div className="update-contact-detail">
      <div className="update-contact-detail-wrapper">
        <div className="update-contact-detail-container">
          <UpdateContactDetailForm
            register={register}
            trigger={trigger}
            setValue={setValue}
            isValid={isValid}
            errors={errors}
            clearErrors={clearErrors}
            phoneValue={phoneValue}
            setPhoneValue={setPhoneValue}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <UpdateContactDetailAvatar handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default UpdateContactDetail;
