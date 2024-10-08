import React, { useState } from "react";
import "./loginBody.styles.scss";
import LoginRightBg from "../../assets/login-right-bg.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import AuthInputField from "../inputField/authInputField.component";
import { loginSchema } from "../../utils/formSchemas.js";
import AuthBodyRightBg from "./AuthBodyRightBg.component.jsx";
import AuthFooterBottomNavigation from "../authFooterBottomNavigation/AuthFooterBottomNavigation.component.jsx";
import AuthForm from "../authForm/AuthForm.component.jsx";
import AuthFormHeaderLogo from "../authFormHeaderLogo/AuthFormHeaderLogo.component.jsx";
import useLogin from "../../hooks/useLogin.js";
import { Link } from "react-router-dom";

const LoginBody = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useLogin();

  const onSubmit = async (data) => {
    console.log("Login data: ", data);
    await login(data);
    reset();
    clearErrors();
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className="auth-body">
      <div className="auth-body-left">
        <AuthFormHeaderLogo />
        <AuthForm
          formType="login"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          <AuthInputField
            type="email"
            fieldType="email"
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
          <Link className="forgot-password-link" to="/forgot-password">
            Forgot password?
          </Link>
        </AuthForm>

        <AuthFooterBottomNavigation
          textLabel="Don't have an account?"
          btnText="Sign up"
          navigationRoute="/register"
        />
      </div>
      <AuthBodyRightBg LoginRightBg={LoginRightBg} />
    </div>
  );
};

export default LoginBody;
