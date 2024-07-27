import React, { useEffect, useState } from "react";
import "./phoneNumberField.styles.scss";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/loading/loading.selector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberField = ({
  phoneLabelText,
  placeholderText,
  fieldType,
  errors,
  trigger,
  isValid,
  setValue,
  phoneNumberValue,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const [showError, setShowError] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");

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
    console.log("Result of error: ", result);
    if (!result) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  // To format the phone number entered in the Phone input
  const formattedPhoneNumber = (value, dialCode) => {
    const countryCode = dialCode;
    const phoneNumber = value.slice(value.length - 10);
    return `+${countryCode} ${phoneNumber}`;
  };

  // to remove error while typing
  const handleChange = (value, country, e) => {
    if (!value) {
      setSelectedCountry("");
    }
    const formattedValue = formattedPhoneNumber(value, country.dialCode);
    setValue(fieldType, formattedValue);
    console.log(formattedValue);
    setShowError(false);
    if (value) {
      setIsHighlighted(true);
    } else {
      setSelectedCountry("");
      setIsHighlighted(false);
    }
  };

  // useEffect to remove the highlight after submission
  useEffect(() => {
    setIsHighlighted(false);
  }, [isLoading]);

  // inorder to handle errors during submission
  useEffect(() => {
    setShowError(!isValid);
  }, [isValid]);

  useEffect(() => {
    if (phoneNumberValue) setIsHighlighted(true);
  }, [phoneNumberValue]);

  console.log("Selected country: ", selectedCountry);

  return (
    <div className="phone-number-field">
      <div
        className={`phone-number-field-wrapper ${
          isHighlighted && "highlighted"
        } ${showError && errors && "phone-number-field-error"}`}
      >
        <label
          htmlFor="phone"
          className={`phone-number-label ${
            isHighlighted &&
            `highlighted ${showError && errors && "label-error-message"}`
          }`}
        >
          {phoneLabelText}
        </label>

        <PhoneInput
          country={selectedCountry}
          specialLabel=""
          placeholder={isHighlighted ? placeholderText : ""}
          value={phoneNumberValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        {showError && errors && (
          <p className={`phone-field-error-message`}>{errors.message}</p>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberField;
