import React from "react";

const ContactPageButton = ({
  preIcon,
  btnText = "Button",
  postIcon,
  onClick = () => {},
  btnClassName = "",
}) => {
  return (
    <div className={btnClassName} onClick={onClick}>
      {preIcon && <span>{preIcon}</span>}
      <span className="btn-name">{btnText}</span>
      {postIcon && <span>{postIcon}</span>}
    </div>
  );
};

export default ContactPageButton;
