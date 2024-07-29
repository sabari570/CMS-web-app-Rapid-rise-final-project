import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import AuthInputField from "../inputField/authInputField.component";
import GenderRadioField from "../genderRadioField/GenderRadioField.component.jsx";
import AuthProfileContainer from "../authProfileContainer/AuthProfileContainer.component.jsx";
import AuthFormHeaderLogo from "../authFormHeaderLogo/AuthFormHeaderLogo.component.jsx";
import AuthForm from "../authForm/AuthForm.component.jsx";
import { registerSchema } from "../../utils/formSchemas.js";
import AuthFooterBottomNavigation from "../authFooterBottomNavigation/AuthFooterBottomNavigation.component.jsx";
import useSignUp from "../../hooks/useSignUp.js";
import {
  formatDateString,
  formattedPhoneNumbersField,
} from "../../utils/helperFunctions.js";
import MultipleInputField from "../multipleInputField/MultipleInputField.component.jsx";

const RegisterBody = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
    reset,
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [clearField, setClearField] = useState(false);
  const { signUp } = useSignUp();

  const onSubmit = async (data) => {
    data.dob = formatDateString(data.dob);
    data.phoneNumbers = formattedPhoneNumbersField(data.phoneNumbers);
    console.log("Register data: ", data);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    formData.append("profilePic", userAvatar);
    await signUp(formData);
    reset();
    setUserAvatar(null);
    clearErrors();
    setClearField(true);
    setTimeout(() => setClearField(false), 0);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div className="auth-body">
      <div className="auth-body-left">
        <AuthFormHeaderLogo />

        <AuthForm
          formType="register"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          <AuthProfileContainer
            type="file"
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
          />
          <div className="register-name-field">
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
              removeHighlightAfterLoading={true}
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
              removeHighlightAfterLoading={true}
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
            removeHighlightAfterLoading={true}
          />
          <AuthInputField
            fieldType="password"
            type={isPasswordVisible ? "text" : "password"}
            labelName="Password"
            placeholder="Enter your password"
            icon={
              isPasswordVisible ? (
                <FaRegEye
                  className="form-icon"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <FaRegEyeSlash
                  className="form-icon"
                  onClick={handlePasswordVisibility}
                />
              )
            }
            register={register}
            errors={errors.password}
            trigger={trigger}
            isValid={isValid}
            removeHighlightAfterLoading={true}
          />

          <AuthInputField
            fieldType="password2"
            type={isConfirmPasswordVisible ? "text" : "password"}
            labelName="Confirm Password"
            placeholder="Confirm your password"
            icon={
              isConfirmPasswordVisible ? (
                <FaRegEye
                  className="form-icon"
                  onClick={handleConfirmPasswordVisibility}
                />
              ) : (
                <FaRegEyeSlash
                  className="form-icon"
                  onClick={handleConfirmPasswordVisibility}
                />
              )
            }
            register={register}
            errors={errors.password2}
            trigger={trigger}
            isValid={isValid}
            removeHighlightAfterLoading={true}
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
            removeHighlightAfterLoading={true}
          />

          <GenderRadioField
            register={register}
            errors={errors}
            fieldType="gender"
          />

          <MultipleInputField
            register={register}
            trigger={trigger}
            fieldValue={"phoneNumbers"}
            errors={errors.phoneNumbers}
            setValue={setValue}
            labelText="Phone numbers"
            placeholderText="Enter a phone number"
            clearField={clearField}
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
            removeHighlightAfterLoading={true}
          />
        </AuthForm>
        <AuthFooterBottomNavigation
          textLabel="Already have an account?"
          navigationRoute="/login"
          btnText="Sign in"
        />
      </div>
    </div>
  );
};

export default RegisterBody;
