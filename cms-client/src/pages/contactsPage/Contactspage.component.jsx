import React, { useEffect, useState } from "react";
import "./contactsPage.styles.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector.js";
import ContactsPageHeader from "../../components/contactsPageHeader/ContactsPageHeader.component.jsx";
import ContactsTable from "../../components/contactsTable/ContactsTable.component.jsx";
import { contactsData } from "../../constants/dummyData.js";
import { columns } from "../../constants/columnDef.jsx";

const Contactspage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [data, setData] = useState(contactsData);
  const [pageIndex, setPageIndex] = useState(0);
  const [sortFieldsObj, setSortFieldsObj] = useState();
  const [statusField, setStatusField] = useState();
  const [companiesList, setCompaniesList] = useState([]);

  // Function to handle deleting a contact
  const handleDelete = (contactId) => {};

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  const handleSortChange = (sortObj) => {
    setSortFieldsObj(sortObj);
  };

  const handleStatusChange = (statusSelected) => {
    setStatusField(statusSelected);
  };

  const handleCompaniesChange = (companiesSelected) => {
    setCompaniesList(companiesSelected);
  };
  return (
    <div className="contacts-page">
      <div className="contacts-page-wrapper">
        <ContactsPageHeader
          onSortChange={handleSortChange}
          onStatusChange={handleStatusChange}
          onCompaniesChange={handleCompaniesChange}
        />
        <ContactsTable
          tableData={data}
          columnDef={columns}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          onDelete={handleDelete}
          sortFieldsObj={sortFieldsObj}
          statusField={statusField}
          companiesList={companiesList}
        />
      </div>
    </div>
  );
};

export default Contactspage;
