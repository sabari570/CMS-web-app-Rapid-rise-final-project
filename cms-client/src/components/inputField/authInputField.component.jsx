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
  defaultValue,
  disabled = false,
  removeHighlightAfterLoading = false,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const [showError, setShowError] = useState(true);

  // useEffect to remove the highlight after submission
  useEffect(() => {
    if (removeHighlightAfterLoading) setIsHighlighted(false);
  }, [isLoading]);

  useEffect(() => {
    if (defaultValue) setIsHighlighted(true);
  }, [defaultValue]);

  // inorder to highlight the field
  const handleFocus = (e) => {
    setIsHighlighted(true);
    setShowError(true);
  };

  // showing error feature when input is focused away
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

  // to remove error while typing
  const handleChange = (e) => {
    setShowError(false);
    if (e.target.value) {
      setIsHighlighted(true);
    } else {
      setIsHighlighted(false);
    }
  };

  // inorder to handle errors during submission
  useEffect(() => {
    setShowError(!isValid);
  }, [isValid]);

  // Inorder to prevent copy in password fields
  const handleCopy = (e) => {
    if (fieldType === "password" || fieldType === "password2") {
      e.preventDefault();
    }
  };

  // Inorder to prevent paste in password fields
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
          disabled={disabled}
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
