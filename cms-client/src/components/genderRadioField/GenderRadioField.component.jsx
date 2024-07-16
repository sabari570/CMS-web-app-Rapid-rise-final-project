import React from "react";
import "./genderRadioField.styles.scss";

const GenderRadioField = ({ register, errors, fieldType }) => {
  return (
    <div className="auth-radio-input-field">
      <label className="radio-field-label">Gender</label>
      <div className="gender-radio-group">
        <label
          className={`gender-radio-group-box ${
            errors.gender && "radio-box-error"
          }`}
        >
          Male
          <input type="radio" value="male" {...register(fieldType)} />
        </label>

        <label
          className={`gender-radio-group-box ${
            errors.gender && "radio-box-error"
          }`}
        >
          Female
          <input type="radio" value="female" {...register(fieldType)} />
        </label>
      </div>
      {errors.gender && (
        <span className="gender-error-message">{errors.gender.message}</span>
      )}
    </div>
  );
};

export default GenderRadioField;
