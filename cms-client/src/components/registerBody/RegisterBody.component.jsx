import React, { useState } from "react";
import RegisterRightBg from "../../assets/register-right-bg.jpg";
import Logo from "../../assets/cms-logo.png";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import AuthBtn from "../authButton/AuthBtn.component";
import AuthInputField from "../inputField/authInputField.component";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/loading/loading.reducer.js";
import GoogleBtn from "../googleBtn/GoogleBtn.component.jsx";
import GenderRadioField from "../genderRadioField/GenderRadioField.component.jsx";
import AuthProfileContainer from "../authProfileContainer/AuthProfileContainer.component.jsx";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Firstname is required" })
      .regex(/^[a-zA-Z_]+$/, { message: "Invalid firstname" }),
    lastName: z
      .string()
      .min(1, { message: "Lastname is required" })
      .regex(/^[a-zA-Z_]+$/, { message: "Invalid lastname" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Please enter a valid email",
    }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters" }),
    password2: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    gender: z.enum(["male", "female"], {
      message: "Gender is required",
    }),
    address: z.string().min(1, { message: "Address is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["password2"],
      });
    }
  });
const RegisterBody = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  const onSubmit = async (data) => {
    console.log("Register data: ", data);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("profilePic", userAvatar);

    console.log("FormData values:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    dispatch(setIsLoading((prev) => !prev));
    reset();
    setUserAvatar(null);
    clearErrors();
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };

  console.log("Submitted: ", isValid, errors);

  return (
    <div className="auth-body">
      <div className="auth-body-left">
        <div className="logo-section">
          <img src={Logo} alt="CMS-logo" />
          <span className="web-app-name">CMS</span>
        </div>

        <form className="auth-form">
          <div className="auth-page-heading">
            <h3>Create Your Account</h3>
            <p className="sub-heading">
              Sign Up for Smarter Contact Management
            </p>
          </div>
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
          />

          <GenderRadioField
            register={register}
            errors={errors}
            fieldType="gender"
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
          />

          <AuthBtn onClick={handleFormSubmit} buttonText="Sign up" />

          <div className="auth-footer-section">
            <div className="auth-footer-section-heading">
              <div className="line"></div>
              <span>or sign up with</span>
            </div>

            <GoogleBtn />
          </div>
        </form>
        <div className="auth-bottom-navigation-footer">
          <p>Already have an account?</p>
          <Link className="navigation-btn" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterBody;
