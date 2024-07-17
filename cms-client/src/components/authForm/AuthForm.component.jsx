import React from "react";
import AuthBtn from "../authButton/AuthBtn.component";
import GoogleBtn from "../googleBtn/GoogleBtn.component";

const formTitles = {
  login: "Sign in",
  register: "Create Your Account",
};

const subHeading = {
  login: "Access Your Contacts Anytime, Anywhere",
  register: "Sign Up for Smarter Contact Management",
};

const authBtnText = {
  login: "Sign in",
  register: "Sign up",
};

const AuthForm = ({
  formType,
  children,
  handleSubmit,
  onSubmit,
}) => {

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)();
  };
  return (
    <form className="auth-form">
      <div className="auth-page-heading">
        <h3>{formTitles[formType]}</h3>
        <p className="sub-heading">{subHeading[formType]}</p>
      </div>
      {children}
      <AuthBtn onClick={handleFormSubmit} buttonText={authBtnText[formType]} />
      <div className="auth-footer-section">
        <div className="auth-footer-section-heading">
          <div className="line"></div>
          <span>or sign up with</span>
        </div>
        <GoogleBtn />
      </div>
    </form>
  );
};

export default AuthForm;
