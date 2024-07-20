import React from "react";
import Select from "react-select";
import { selectLabelCustomStyles } from "../../constants/appConstants";

const FilterByDropdown = ({
  isFilterDropdownOpen,
  setSelectedStatus,
  selectedStatus,
  selectedCompanies,
  setSelectedCompanies,
  applyFilter,
  resetFilter,
}) => {
  const statusFields = ["Online", "Offline"];
  const companyNames = [
    { label: "Google", value: "google" },
    { label: "Amazon", value: "Amazon" },
    { label: "Flipkart", value: "flipkart" },
    { label: "Zoho", value: "zoho" },
    { label: "Innovature", value: "innovature" },
  ];
  return (
    <div
      className={`filter-dropdown-menu ${
        isFilterDropdownOpen && "dropdown-open"
      }`}
    >
      <div className="filter-dropdown-menu-field">
        <p className="heading">Status</p>
        <div className="seperator"></div>
        <div className="filter-dropdown-menu-field-list">
          {statusFields.map((status) => (
            <div
              key={status}
              className={`filter-dropdown-menu-field-list-item ${
                selectedStatus === status && "status-active"
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-dropdown-menu-field">
        <p className="heading">Company Name</p>
        <div className="seperator"></div>
        <div className="filter-dropdown-menu-field-list">
          <Select
            isMulti
            name="companyNames"
            options={companyNames}
            className="company-names-multi-select"
            classNamePrefix="select"
            styles={selectLabelCustomStyles}
            value={selectedCompanies}
            onChange={setSelectedCompanies}
            placeholder="Select companies"
          />
        </div>
      </div>

      <div className="filter-dropdown-footer-btns">
        <button className="filter-apply-btn" onClick={resetFilter}>
          Reset
        </button>
        <button className="filter-apply-btn" onClick={applyFilter}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterByDropdown;
