import React, { useEffect, useRef, useState } from "react";
import "./tableLimitDropdown.styles.scss";
import CmsCustomDropdown from "../cmsCustomDropdown/CmsCustomDropdown.component";
import CmsDropdownItem from "../cmsCustomDropdown/cmsDropdownItem.component";

const TableLimitDropdown = ({ limitLabel, setLimit, limitValue }) => {
  const [selectedLimit, setSelectedLimit] = useState(limitValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cmsDropdownRef = useRef();
  const handleLimitChange = (limit) => {
    setLimit(limit);
    setSelectedLimit(limit);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      if (
        cmsDropdownRef.current &&
        !cmsDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [cmsDropdownRef]);

  const options = [5, 10, 20, 30, 40, 50];
  return (
    <div className="table-limit-wrapper">
      <label htmlFor="lines-per-page" className="limit-label">
        {limitLabel}
      </label>

      <div ref={cmsDropdownRef} className="page-limit-dropdown-wrapper">
        <CmsCustomDropdown
          placeholderText="Limit"
          btnText={selectedLimit}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownTextClassName="cms-dropdown-value-text"
          labelClassName={`cms-dropdown-btn-label ${
            selectedLimit ? "active" : null
          }`}
          content={
            <>
              {options.map((item, index) => (
                <CmsDropdownItem
                  key={index}
                  onClick={() => handleLimitChange(item)}
                >
                  {item}
                </CmsDropdownItem>
              ))}
            </>
          }
        />
      </div>
    </div>
  );
};

export default TableLimitDropdown;
