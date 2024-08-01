import React, { useEffect, useState } from "react";
import "./resetPassword.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema } from "../../utils/formSchemas";
import useResetPassword from "../../hooks/useResetPassword";
import AuthInputField from "../../components/inputField/authInputField.component";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AuthBtn from "../../components/authButton/AuthBtn.component";

const ResetPassword = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { id, token } = useParams();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { resetPassword } = useResetPassword();

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
  }, [currentUser]);

  const onSubmit = async (data) => {
    console.log("reset password data: ", data);
    await resetPassword(data, id, token);
    reset();
    clearErrors();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };
  return (
    !currentUser && (
      <div className="reset-password">
        <div className="reset-password-wrapper">
          <p className="heading">Reset Password</p>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <AuthBtn onClick={handleFormSubmit} buttonText={"Submit"} />
          </form>
        </div>
      </div>
    )
  );
};

export default ResetPassword;
