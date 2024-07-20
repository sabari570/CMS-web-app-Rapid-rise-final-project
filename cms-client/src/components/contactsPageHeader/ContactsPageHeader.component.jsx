import React, { useEffect, useRef, useState } from "react";
import "./contactsPageHeader.styles.scss";
import { HiFilter } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { BiSortUp } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import ContactPageButton from "../contactPageButton/ContactPageButton.component";
import SortByDropdown from "./SortByDropdown.component";
import FilterByDropdown from "./FilterByDropdown.component";

const ContactsPageHeader = ({
  onSortChange,
  onStatusChange,
  onCompaniesChange,
}) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedSortField, setSelectedSortField] = useState();
  const [sortType, setSortType] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const dropdownRef = useRef(null);
  const sortButtonRef = useRef(null);
  const filterButtonRef = useRef(null);

  const handleSortDropdown = (e) => {
    e.stopPropagation();
    setIsSortDropdownOpen((prev) => !prev);
  };

  const handleFilterDropdown = (e) => {
    e.stopPropagation();
    setIsFilterDropdownOpen((prev) => !prev);
  };

  const applySorting = () => {
    if (selectedSortField && sortType) {
      const sortObj = { id: selectedSortField, type: sortType.toLowerCase() };
      onSortChange(sortObj);
    } else {
      onSortChange({});
    }
    setIsSortDropdownOpen(false);
  };

  const resetSorting = () => {
    onSortChange({});
    setSelectedSortField(null);
    setSortType(null);
    setIsSortDropdownOpen(false);
  };

  const applyFilter = () => {
    if (selectedStatus) {
      onStatusChange(selectedStatus);
    }
    if (selectedCompanies.length > 0) {
      console.log("Reached here");
      onCompaniesChange(selectedCompanies);
    }
    setIsFilterDropdownOpen(false);
  };

  const resetFilter = () => {
    onStatusChange(null);
    onCompaniesChange([]);
    setSelectedStatus(null);
    setSelectedCompanies([]);
    setIsFilterDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !sortButtonRef.current.contains(event.target) &&
        // Inorder tp prevent the dropdown from getting close when the close icon of select input is clicked
        !event.target.closest(".react-select__clear-indicator")
      ) {
        setIsSortDropdownOpen(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target) &&
        !event.target.closest(".select__clear-indicator")
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    if (isSortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else if (isFilterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortDropdownOpen, isFilterDropdownOpen]);

  return (
    <div className="contacts-page-header-wrapper">
      <div ref={sortButtonRef}>
        <ContactPageButton
          btnClassName={`button-wrapper ${
            isSortDropdownOpen && "dropdown-menu-btn-active"
          }`}
          preIcon={<BiSortUp className="button-wrapper-pre-icon" />}
          btnText="Sort by"
          postIcon={
            <IoChevronDown
              className={`button-wrapper-post-icon ${
                isSortDropdownOpen && "dropdown-menu-open"
              }`}
            />
          }
          onClick={handleSortDropdown}
          buttonWrapperParentClassName="sort-by-dropdown-parent"
        >
          {/* SORT BY DROPDOWN */}
          <div ref={dropdownRef}>
            <SortByDropdown
              isSortDropdownOpen={isSortDropdownOpen}
              selectedSortField={selectedSortField}
              setSelectedSortField={setSelectedSortField}
              selectedSortType={sortType}
              setSortType={setSortType}
              applySorting={applySorting}
              resetSorting={resetSorting}
            />
          </div>
          <div
            className={`mobile-screen-filters-overlay ${
              isSortDropdownOpen && "overlay-active"
            }`}
          ></div>
        </ContactPageButton>
      </div>

      <div ref={filterButtonRef}>
        <ContactPageButton
          btnClassName={`button-wrapper ${
            isFilterDropdownOpen && "dropdown-menu-btn-active"
          }`}
          preIcon={<HiFilter className="button-wrapper-pre-icon" />}
          btnText="Filters"
          postIcon={
            <IoChevronDown
              className={`button-wrapper-post-icon ${
                isFilterDropdownOpen && "dropdown-menu-open"
              }`}
            />
          }
          onClick={handleFilterDropdown}
          buttonWrapperParentClassName="filter-by-dropdown-parent"
        >
          {/* FILTER DROPDOWN */}
          <div ref={dropdownRef}>
            <FilterByDropdown
              isFilterDropdownOpen={isFilterDropdownOpen}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCompanies={selectedCompanies}
              setSelectedCompanies={setSelectedCompanies}
              applyFilter={applyFilter}
              resetFilter={resetFilter}
            />
          </div>
        </ContactPageButton>
      </div>

      <ContactPageButton
        btnClassName="button-wrapper create-btn"
        preIcon={<IoIosAdd className="button-wrapper-pre-icon create-btn" />}
        btnText="New Contact"
      />
    </div>
  );
};

export default ContactsPageHeader;
