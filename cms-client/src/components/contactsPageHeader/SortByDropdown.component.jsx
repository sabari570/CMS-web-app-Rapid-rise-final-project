import React from "react";
import { TiTick } from "react-icons/ti";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";

const SortByDropdown = ({
  isSortDropdownOpen,
  setSelectedSortField,
  selectedSortField,
  selectedSortType,
  setSortType,
  applySorting,
  resetSorting,
}) => {
  const sortFields = [
    {
      label: "Name",
      value: "firstName",
    },
    {
      label: "Address",
      value: "address",
    },
    {
      label: "Company Name",
      value: "companyName",
    },
  ];

  const sortOrders = ["Asc", "Desc"];
  return (
    <div
      className={`sort-dropdown-menu ${isSortDropdownOpen && "dropdown-open"}`}
    >
      {sortFields.map((field) => (
        <div
          key={field.label}
          className="sort-dropdown-menu-field-item"
          onClick={() => setSelectedSortField(field.value)}
        >
          {field.label}
          {selectedSortField === field.value && (
            <TiTick className="sort-dropdown-tick-icon" />
          )}
        </div>
      ))}
      <div className="sort-dropdown-menu-seperator"></div>
      {sortOrders.map((order) => (
        <div
          key={order}
          className="sort-dropdown-menu-order-item"
          onClick={() => setSortType(order)}
        >
          {order}
          {order === "Asc" ? (
            <IoMdArrowRoundUp className="sort-order-icon" />
          ) : (
            <IoMdArrowRoundDown className="sort-order-icon" />
          )}
          {selectedSortType === order && (
            <TiTick className="sort-dropdown-tick-icon" />
          )}
        </div>
      ))}
      <div className="sort-dropdown-menu-seperator"></div>
      <div className="sort-dropdown-footer-btns">
        <button className="sort-apply-btn" onClick={resetSorting}>
          Reset
        </button>
        <button className="sort-apply-btn" onClick={applySorting}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default SortByDropdown;
