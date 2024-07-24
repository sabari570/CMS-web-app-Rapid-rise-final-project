import React, { useEffect, useState } from "react";
import "./updateContactDetail.styles.scss";
import UpdateContactDetailForm from "../updateContactDetailForm/UpdateContactDetailForm.component";
import UpdateContactDetailAvatar from "../updateContactDetailAvatar/UpdateContactDetailAvatar.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../utils/formSchemas";
import UserAvatarContainer from "../userAvatarContainer/UserAvatarContainer.component";
import {
  capitalizeFirstLetter,
  handleImageUrl,
} from "../../utils/helperFunctions";
import AuthBtn from "../authButton/AuthBtn.component";
import useIsMobile from "../../hooks/useIsMobile";
import useUpdateContactAvatar from "../../hooks/useUpdateContactAvatar";
import useUpdateContactDetail from "../../hooks/useUpdateContactDetail";
import { useSelector } from "react-redux";
import { selectSelectedContact } from "../../store/contact/contact.selector";

const UpdateContactDetail = () => {
  const selectedContact = useSelector(selectSelectedContact);
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
    defaultValues: selectedContact,
  });
  const [phoneValue, setPhoneValue] = useState(selectedContact.phone);
  const [selectedStatus, setSelectedStatus] = useState(selectedContact.status);
  const [userAvatar, setUserAvatar] = useState(null);
  const { loading, updateContactAvatar } = useUpdateContactAvatar();
  const { updateContactDetail } = useUpdateContactDetail();

  const handleUpdateImage = async (e) => {
    console.log("now call the update api with the image object");
    const formData = new FormData();
    formData.append("profilePic", userAvatar);
    await updateContactAvatar(selectedContact._id, formData);
    setUserAvatar(null);
  };

  const onSubmit = async (data) => {
    console.log("Contact data: ", data);
    if (data.companyName) {
      data.companyName = capitalizeFirstLetter(data.companyName);
    }
    await updateContactDetail(selectedContact._id, data);
    reset();
    setPhoneValue(null);
    setSelectedStatus(null);
    clearErrors();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    setPhoneValue(selectedContact.phone);
    setSelectedStatus(selectedContact.status);
    console.log("After updating initial values:", selectedContact);
  }, [selectedContact]);

  console.log("phone and status values: ", phoneValue, selectedStatus);

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
                imageUrl={handleImageUrl(selectedContact.profilePic)}
                onClick={handleUpdateImage}
                isLoading={loading}
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
            defaultValues={selectedContact}
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
              contactId={selectedContact._id}
              handleFormSubmit={handleFormSubmit}
              imageUrl={selectedContact.profilePic}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateContactDetail;
