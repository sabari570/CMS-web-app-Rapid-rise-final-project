import React, { useEffect, useState } from "react";
import "./authInputField.styles.scss";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/loading/loading.selector.js";

const AuthInputField = ({
  type,
  labelName,
  placeholder,
  icon,
  register,
  errors,
  trigger,
  passwordType,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isLoading = useSelector(selectIsLoading);

  const handleFocus = () => {
    setIsHighlighted(true);
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsHighlighted(false);
    }
    trigger(type);
  };

  const handleChange = (e) => {
    if (errors) {
      trigger(type);
    }
  };

  useEffect(() => {
    setIsHighlighted(false);
  }, [isLoading]);
  return (
    <div
      className={`input-field ${isHighlighted && "highlighted"} ${
        errors && "input-field-error"
      }`}
    >
      <label
        className={`input-label ${
          isHighlighted && `highlighted ${errors && "label-error-message"}`
        }`}
      >
        {labelName}
      </label>
      {icon}
      <input
        {...register(type, {
          onBlur: handleBlur,
          onChange: handleChange,
        })}
        type={passwordType ? passwordType : type}
        placeholder={isHighlighted ? placeholder : ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {errors && <p className="input-field-error-message">{errors.message}</p>}
    </div>
  );
};

export default AuthInputField;
