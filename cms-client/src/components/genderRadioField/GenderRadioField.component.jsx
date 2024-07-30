import React, { useEffect, useState } from "react";
import "./genderRadioField.styles.scss";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/loading/loading.selector";

const GenderRadioField = ({ register, errors, fieldType, defaultValue }) => {
  const [selectedGender, setSelectedGender] = useState(defaultValue);
  const [showError, setShowError] = useState(false);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!defaultValue) setSelectedGender(null);
  }, [loading]);

  useEffect(() => {
    if (errors) setShowError(true);
  }, [errors]);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setShowError(false);
  };
  return (
    <div className="auth-radio-input-field">
      <label className="radio-field-label">Gender</label>
      <div className="gender-radio-group">
        <label
          className={`gender-radio-group-box ${
            errors.gender && showError && "radio-box-error"
          } ${selectedGender === "male" ? "radio-selected" : ""}`}
        >
          Male
          <input
            type="radio"
            value="male"
            {...register(fieldType)}
            onChange={handleGenderChange}
          />
        </label>

        <label
          className={`gender-radio-group-box ${
            errors.gender && showError && "radio-box-error"
          } ${selectedGender === "female" ? "radio-selected" : ""}`}
        >
          Female
          <input
            type="radio"
            value="female"
            {...register(fieldType)}
            onChange={handleGenderChange}
          />
        </label>

        <label
          className={`gender-radio-group-box ${
            errors.gender && showError && "radio-box-error"
          } ${selectedGender === "others" ? "radio-selected" : ""}`}
        >
          Others
          <input
            type="radio"
            value="others"
            {...register(fieldType)}
            onChange={handleGenderChange}
          />
        </label>
      </div>
      {errors.gender && showError && (
        <span className="gender-error-message">{errors.gender.message}</span>
      )}
    </div>
  );
};

export default GenderRadioField;
