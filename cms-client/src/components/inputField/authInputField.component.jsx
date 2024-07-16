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
  isValid,
  fieldType,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const [showError, setShowError] = useState(true);

  const handleFocus = () => {
    setIsHighlighted(true);
    setShowError(true);
  };

  const handleBlur = async (e) => {
    if (!e.target.value) {
      setIsHighlighted(false);
    }
    const result = await trigger(fieldType);
    if (!result) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleChange = (e) => {
    setShowError(false);
  };

  useEffect(() => {
    setIsHighlighted(false);
  }, [isLoading]);

  useEffect(() => {
    setShowError(!isValid);
  }, [isValid]);

  const handleCopy = (e) => {
    if (fieldType === "password" || fieldType === "password2") {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (fieldType === "password" || fieldType === "password2") {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`input-field ${isHighlighted && "highlighted"} ${
        showError && errors && "input-field-error"
      } ${fieldType === "address" && "address-field"}`}
    >
      <label
        className={`input-label ${
          isHighlighted &&
          `highlighted ${showError && errors && "label-error-message"}`
        } ${fieldType === "address" && "address-field-label"}`}
      >
        {labelName}
      </label>
      {icon}
      {fieldType === "address" ? (
        <textarea
          {...register(fieldType, {
            onBlur: handleBlur,
            onChange: handleChange,
          })}
          placeholder={isHighlighted ? placeholder : ""}
          onFocus={handleFocus}
          rows="7"
        />
      ) : (
        <input
          {...register(fieldType, {
            onBlur: handleBlur,
            onChange: handleChange,
          })}
          type={type}
          placeholder={isHighlighted ? placeholder : ""}
          onFocus={handleFocus}
          onCopy={handleCopy}
          onPaste={handlePaste}
        />
      )}
      {showError && errors && (
        <p
          className={`input-field-error-message ${
            fieldType === "address" && "address-field-error-message"
          }`}
        >
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default AuthInputField;
