import React, { useEffect, useState } from "react";
import "./loginBody.styles.scss";
import LoginRightBg from "../../assets/login-right-bg.jpg";
import Logo from "../../assets/cms-logo.png";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import AuthBtn from "../authButton/AuthBtn.component";
import AuthInputField from "../inputField/authInputField.component";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/loading/loading.reducer.js";
import GoogleBtn from "../googleBtn/GoogleBtn.component.jsx";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

const LoginBody = () => {
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    console.log("Login data: ", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    dispatch(setIsLoading(true));
    reset();
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className="auth-body">
      <div className="auth-body-left">
        <div className="logo-section">
          <img src={Logo} alt="CMS-logo" />
          <span className="web-app-name">CMS</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-page-heading">
            <h3>Sign in</h3>
            <p className="sub-heading">
              Access Your Contacts Anytime, Anywhere
            </p>
          </div>
          <AuthInputField
            type="email"
            labelName="E-mail"
            placeholder="example@gmail.com"
            icon={<IoMailOutline className="form-icon" />}
            register={register}
            errors={errors.email}
            trigger={trigger}
          />
          <AuthInputField
            type="password"
            passwordType={isPasswordVisible ? "text" : "password"}
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
          />

          <AuthBtn buttonText="Sign in" isSubmitting={isSubmitting} />

          <div className="auth-footer-section">
            <div className="auth-footer-section-heading">
              <div className="line"></div>
              <span>or sign up with</span>
            </div>

            <GoogleBtn />
          </div>
        </form>
        <div className="auth-bottom-navigation-footer">
          <p>Don't have an account?</p>
          <Link className="navigation-btn" to="/register">
            Sign up
          </Link>
        </div>
      </div>
      <div className="auth-body-right">
        <div className="image-container">
          <img src={LoginRightBg} alt="login-right-image" />
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
