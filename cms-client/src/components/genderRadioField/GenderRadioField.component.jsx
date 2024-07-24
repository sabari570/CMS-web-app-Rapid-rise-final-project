import React, { useEffect, useState } from "react";
import "./genderRadioField.styles.scss";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/loading/loading.selector";

const GenderRadioField = ({ register, errors, fieldType, defaultValue }) => {
  const [selectedGender, setSelectedGender] = useState(defaultValue);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!defaultValue) setSelectedGender(null);
  }, [loading]);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  return (
    <div className="auth-radio-input-field">
      <label className="radio-field-label">Gender</label>
      <div className="gender-radio-group">
        <label
          className={`gender-radio-group-box ${
            errors.gender && "radio-box-error"
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
            errors.gender && "radio-box-error"
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
      </div>
      {errors.gender && (
        <span className="gender-error-message">{errors.gender.message}</span>
      )}
    </div>
  );
};

export default GenderRadioField;
