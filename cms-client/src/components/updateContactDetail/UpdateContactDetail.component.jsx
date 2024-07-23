import React, { useEffect, useState } from "react";
import "./updateContactDetail.styles.scss";
import UpdateContactDetailForm from "../updateContactDetailForm/UpdateContactDetailForm.component";
import UpdateContactDetailAvatar from "../updateContactDetailAvatar/UpdateContactDetailAvatar.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../utils/formSchemas";
import UserAvatarContainer from "../userAvatarContainer/UserAvatarContainer.component";
import { handleImageUrl } from "../../utils/helperFunctions";
import AuthBtn from "../authButton/AuthBtn.component";
import useIsMobile from "../../hooks/useIsMobile";
import useUpdateContactAvatar from "../../hooks/useUpdateContactAvatar";

const UpdateContactDetail = ({ initialValues }) => {
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
    defaultValues: initialValues,
  });
  const [phoneValue, setPhoneValue] = useState(initialValues.phone);
  const [selectedStatus, setSelectedStatus] = useState(initialValues.status);
  const [userAvatar, setUserAvatar] = useState(null);
  const { loading, updateContactAvatar } = useUpdateContactAvatar();

  const handleUpdateImage = async (e) => {
    console.log("now call the update api with the image object");
    const formData = new FormData();
    formData.append("profilePic", userAvatar);
    await updateContactAvatar(initialValues._id, formData);
    setUserAvatar(null);
  };

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

  useEffect(() => {
    setPhoneValue(initialValues.phone);
    setSelectedStatus(initialValues.status);
  }, [initialValues]);

  console.log("Initial values: ", initialValues);

  const isMobile = useIsMobile(650);
  return (
    <div className="update-contact-detail">
      <div className="update-contact-detail-wrapper">
        <div className="update-contact-detail-container">
          {isMobile && (
            <div className="contact-profile-avatar-container-mobile">
              <UserAvatarContainer
                userAvatar={userAvatar}
                setUserAvatar={setUserAvatar}
                imageUrl={handleImageUrl(initialValues.profilePic)}
                onClick={handleUpdateImage}
              />
            </div>
          )}
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
            defaultValues={initialValues}
          />

          <div className="contact-profile-update-btn-mobile">
            <AuthBtn
              buttonText={"Update"}
              btnClassName="contact-profile-update-btn"
              onClick={handleFormSubmit}
            />
          </div>
          {!isMobile && (
            <UpdateContactDetailAvatar
              contactId={initialValues._id}
              handleFormSubmit={handleFormSubmit}
              imageUrl={initialValues.profilePic}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateContactDetail;
