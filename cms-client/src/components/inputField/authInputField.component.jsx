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
  const [showError, setShowError] = useState(true);

  const handleFocus = () => {
    setIsHighlighted(true);
  };

  const handleBlur = async (e) => {
    if (!e.target.value) {
      setIsHighlighted(false);
    }
    const result = await trigger(type);
    if (!result) {
      setShowError(true);
    } else {
      setShowError(false);
    }
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
        showError && errors && "input-field-error"
      }`}
    >
      <label
        className={`input-label ${
          isHighlighted &&
          `highlighted ${showError && errors && "label-error-message"}`
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
      />
      {showError && errors && (
        <p className="input-field-error-message">{errors.message}</p>
      )}
    </div>
  );
};

export default AuthInputField;
