import React, { useEffect } from "react";
import "./forgotPassword.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../utils/formSchemas";
import AuthInputField from "../../components/inputField/authInputField.component";
import { IoMailOutline } from "react-icons/io5";
import AuthBtn from "../../components/authButton/AuthBtn.component";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { forgotPassword } = useForgotPassword();

  useEffect(() => {
    if (currentUser) navigate("/dashboard");
  }, [currentUser]);

  const onSubmit = async (data) => {
    console.log("forgot password data: ", data);
    reset();
    await forgotPassword(data);
    clearErrors();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };
  return (
    !currentUser && (
      <div className="forgot-password">
        <div className="forgot-password-wrapper">
          <p className="heading">Forgot Password</p>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <AuthBtn onClick={handleFormSubmit} buttonText={"Submit"} />
          </form>
        </div>
      </div>
    )
  );
};

export default ForgotPassword;
