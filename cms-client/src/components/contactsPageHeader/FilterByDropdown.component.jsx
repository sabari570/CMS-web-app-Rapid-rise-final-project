import React, { useEffect, useState } from "react";
import Select from "react-select";
import useIsMobile from "../../hooks/useIsMobile";
import { selectLabelCustomStyles } from "../../constants/appConstants";
import useFetchCompaniesList from "../../hooks/useFetchCompaniesList";

const FilterByDropdown = ({
  isFilterDropdownOpen,
  setSelectedStatus,
  selectedStatus,
  selectedCompanies,
  setSelectedCompanies,
  applyFilter,
  resetFilter,
}) => {
  const isMobile = useIsMobile(650);
  const { fetchCompanies } = useFetchCompaniesList();
  const [companiesList, setCompaniesList] = useState([]);
  const statusFields = ["Employee", "Trainee"];

  const handleFetchCompanies = async () => {
    const companiesResponse = await fetchCompanies();
    const formattedCompaniesList = companiesResponse.companiesList.map(
      (company) => ({ label: company, value: company })
    );
    setCompaniesList(formattedCompaniesList);
  };

  useEffect(() => {
    handleFetchCompanies();
  }, []);

  console.log("Companies List: ", companiesList);
  return (
    <div
      className={`filter-dropdown-menu ${
        isFilterDropdownOpen && "dropdown-open"
      }`}
    >
      <div>
        <div className="filter-by-title">Filter by</div>
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
              options={companiesList}
              className="company-names-multi-select"
              classNamePrefix="select"
              styles={selectLabelCustomStyles(isMobile)}
              value={selectedCompanies}
              onChange={setSelectedCompanies}
              placeholder="Select companies"
            />
          </div>
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
