import React from "react";
import "./tableLimitDropdown.styles.scss";

const TableLimitDropdown = ({ limitLabel, setLimit, limitValue }) => {
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const options = [5, 10, 20, 30, 40, 50];
  return (
    <div className="table-limit-wrapper">
      <label htmlFor="lines-per-page" className="limit-label">
        {limitLabel}
      </label>

      <select
        id="lines-per-page"
        value={limitValue}
        onChange={handleLimitChange}
      >
        {options.map((option) => (
          <option key={option} value={option} className="limit-option-item">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableLimitDropdown;
