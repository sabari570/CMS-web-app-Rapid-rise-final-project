import React, { useEffect, useState } from "react";
import "./multipleInputField.styles.scss";
import { phoneSchema } from "../../utils/formSchemas";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/loading/loading.selector";

const MultipleInputField = ({
  register,
  trigger,
  errors,
  fieldValue,
  setValue,
  labelText,
  placeholderText,
  defaultValue,
  removeHighlightAfterLoading = false,
  clearField,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [error, setError] = useState("");
  const isLoading = useSelector(selectIsLoading);

  // useEffect to remove the highlight after submission
  useEffect(() => {
    if (removeHighlightAfterLoading) setIsHighlighted(false);
  }, [isLoading]);

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setIsHighlighted(true);
      setPhoneNumbers(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (phoneNumbers.length === 0) setIsHighlighted(false);
    if (phoneNumbers.length > 0) {
      setIsHighlighted(true);
      setError("");
      setValue(fieldValue, phoneNumbers);
    }
  }, [phoneNumbers]);

  useEffect(() => {
    setValue(fieldValue, []);
  }, [fieldValue, clearField]);

  useEffect(() => {
    setError(errors?.message);
  }, [errors]);

  useEffect(() => {
    if (clearField) {
      setPhoneNumbers([]);
      setPhoneNumber("");
      setError("");
      setIsHighlighted(false);
    }
  }, [clearField]);

  const handleBlur = async (e) => {
    if (!e.target.value && phoneNumbers.length === 0) {
      setIsHighlighted(false);
    }
    await trigger(fieldValue);
    if (e.target.value) {
      setIsHighlighted(true);
      try {
        phoneSchema.parse(e.target.value);
      } catch (error) {
        console.log("Error while parsing phone number: ", error);
        const errorMessage = JSON.parse(error.message);
        setError(errorMessage[0]?.message);
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value || phoneNumbers.length > 0) {
      setIsHighlighted(true);
    } else {
      setIsHighlighted(false);
    }
    setPhoneNumber(e.target.value);
    setError("");
  };

  const handleKeyDown = (e) => {
    const code = e.keyCode || e.which;
    const newPhoneNumber = phoneNumber.trim();
    if ((code !== 13 && code !== 188) || newPhoneNumber.length === 0) {
      return;
    }
    e.preventDefault();
    if (!phoneNumbers.includes(newPhoneNumber)) {
      try {
        phoneSchema.parse(newPhoneNumber);
        setPhoneNumbers((prev) => {
          const updatedPhoneNumbers = [...prev, newPhoneNumber];
          setValue(fieldValue, updatedPhoneNumbers);
          return updatedPhoneNumbers;
        });
        setPhoneNumber("");
      } catch (error) {
        console.log("Error while parsing phone number: ", error);
        const errorMessage = JSON.parse(error.message);
        setError(errorMessage[0]?.message);
      }
    }
  };

  const handleRemovePhoneNumber = (index) => {
    setPhoneNumbers((prev) => {
      const updatedPhoneNumbers = prev.filter((_, i) => i !== index);
      setValue(fieldValue, updatedPhoneNumbers);
      return updatedPhoneNumbers;
    });
  };

  console.log("Default value obtained: ", defaultValue);
  console.log("Phone numbers: ", phoneNumbers);
  console.log("Phone numbers errors: ", errors);

  return (
    <div className="multiple-input-field">
      <div className="multiple-input-field-wrapper">
        <p className="multi-input-message">
          Press enter to add a new number. You can also seperate numbers by
          using coma. Accepts the following format: +(code) ##########
        </p>
        <div
          className={`phone-numbers-input-field ${
            isHighlighted && "highlighted"
          } ${error && "number-field-error"}`}
        >
          <label
            htmlFor="phone-input"
            className={`multi-input-label ${
              isHighlighted && `highlighted ${error && "label-error-message"}`
            }`}
          >
            {labelText}
          </label>
          <div className="number-container">
            {phoneNumbers.map((number, index) => (
              <div key={index} className="number-tag">
                <span className="number">{number}</span>
                <span
                  className="icon"
                  onClick={(e) => handleRemovePhoneNumber(index)}
                >
                  &times;
                </span>
              </div>
            ))}
            <input
              type="text"
              id="phone-input"
              placeholder={isHighlighted ? placeholderText : ""}
              value={phoneNumber}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          </div>
        </div>
        {error && <div className="number-field-error-message">{error}</div>}
        <input
          type="hidden"
          {...register(fieldValue, {
            validate: (value) => {
              const phoneNumberArray = value.split(",");
              if (phoneNumberArray.length === 0) {
                return "At least one phone number is required";
              }
              return true;
            },
          })}
          value={phoneNumbers.join(",")}
        />
      </div>
    </div>
  );
};

export default MultipleInputField;
