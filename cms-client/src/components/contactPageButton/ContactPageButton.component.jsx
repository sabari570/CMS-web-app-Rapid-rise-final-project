import React from "react";

const ContactPageButton = ({
  preIcon,
  btnText = "Button",
  postIcon,
  onClick = () => {},
  btnClassName = "",
  buttonWrapperParentClassName = "",
  children,
}) => {
  return (
    <div className={buttonWrapperParentClassName}>
      <div className={btnClassName} onClick={onClick}>
        {preIcon && <span>{preIcon}</span>}
        <span className="btn-name">{btnText}</span>
        {postIcon && <span>{postIcon}</span>}
      </div>
      {children}
    </div>
  );
};

export default ContactPageButton;
