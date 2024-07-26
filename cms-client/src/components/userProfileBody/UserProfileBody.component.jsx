import React, { useEffect, useState } from "react";
import "./userProfileBody.styles.scss";
import UserAvatarContainer from "../userAvatarContainer/UserAvatarContainer.component";
import {
  formatDateForInputField,
  formatDateString,
  formattedPhoneNumbersField,
  handleImageUrl,
} from "../../utils/helperFunctions.js";
import AuthBtn from "../authButton/AuthBtn.component.jsx";
import { useForm } from "react-hook-form";
import { userProfileSchema } from "../../utils/formSchemas.js";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInputField from "../inputField/authInputField.component.jsx";
import { FaRegUser } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import GenderRadioField from "../genderRadioField/GenderRadioField.component.jsx";
import useUpdateUserAvatar from "../../hooks/useUpdateUserAvatar.js";
import useUpdateUserDetail from "../../hooks/useUpdateUserDetail.js";
import MultipleInputField from "../multipleInputField/MultipleInputField.component.jsx";

const UserProfileBody = ({ userData, setUserData }) => {
  const [userAvatar, setUserAvatar] = useState();
  const { loading, updateUserAvatar } = useUpdateUserAvatar();
  const { updateUserDetail } = useUpdateUserDetail();

  const formattedUserData = {
    ...userData,
    dob: formatDateForInputField(userData.dob),
    phoneNumbers: formattedPhoneNumbersField(userData.phoneNumbers),
  };
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
    reset,
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: formattedUserData,
  });

  useEffect(() => {
    reset(formattedUserData);
  }, [userData, reset]);

  const handleUpdateImage = async (e) => {
    console.log("now call the update api with the image object");
    const formData = new FormData();
    formData.append("profilePic", userAvatar);
    await updateUserAvatar(formData);
    setUserAvatar(null);
  };

  const onSubmit = async (data) => {
    data.dob = formatDateString(data.dob);
    console.log("User data: ", data);
    const userResponse = await updateUserDetail(data);
    setUserData(userResponse);
    reset();
    clearErrors();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="user-profile-body">
      <div className="user-profile-body-wrapper">
        <div className="user-profile-avatar-container">
          <UserAvatarContainer
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            imageUrl={handleImageUrl(userData.profilePic)}
            onClick={handleUpdateImage}
            isLoading={loading}
          />
        </div>

        <form className="user-profile-form">
          <div className="user-profile-form-name-field">
            <AuthInputField
              fieldType="firstName"
              type="text"
              labelName="First Name"
              placeholder="John"
              register={register}
              errors={errors.firstName}
              trigger={trigger}
              isValid={isValid}
              icon={<FaRegUser className="form-icon" />}
              defaultValue={userData.firstName}
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
              icon={<FaRegUser className="form-icon" />}
              defaultValue={userData.lastName}
            />
          </div>
          <AuthInputField
            fieldType="email"
            type="email"
            labelName="E-mail"
            placeholder="example@gmail.com"
            icon={<IoMailOutline className="form-icon" />}
            register={register}
            errors={errors.email}
            trigger={trigger}
            isValid={isValid}
            defaultValue={userData.email}
            disabled={true}
          />
          <AuthInputField
            fieldType="dob"
            type="date"
            labelName="Date of Birth"
            placeholder="Date of Birth"
            register={register}
            errors={errors.dob}
            trigger={trigger}
            isValid={isValid}
            defaultValue={userData.dob}
          />

          <GenderRadioField
            register={register}
            errors={errors}
            fieldType="gender"
            defaultValue={userData.gender}
          />

          <MultipleInputField
            register={register}
            trigger={trigger}
            fieldValue={"phoneNumbers"}
            errors={errors.phoneNumbers}
            setValue={setValue}
            labelText="Phone numbers"
            placeholderText="Enter a phone number"
            defaultValue={formattedPhoneNumbersField(userData?.phoneNumbers)}
          />

          <AuthInputField
            fieldType="address"
            type="text"
            labelName="Address"
            placeholder="1234 Elm Street, Apt 567"
            register={register}
            errors={errors.address}
            trigger={trigger}
            isValid={isValid}
            defaultValue={userData.address}
          />
        </form>

        <div className="user-profile-footer-btn">
          <AuthBtn
            buttonText={"Update"}
            btnClassName="user-profile-update-btn"
            onClick={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileBody;
