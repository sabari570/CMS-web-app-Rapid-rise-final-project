import React, { useEffect, useState } from "react";
import "./contactsPage.styles.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector.js";
import ContactsPageHeader from "../../components/contactsPageHeader/ContactsPageHeader.component.jsx";
import ContactsTable from "../../components/contactsTable/ContactsTable.component.jsx";
import { columns } from "../../constants/columnDef.jsx";
import useDeleteContact from "../../hooks/useDeleteContact.js";

const Contactspage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [sortFieldsObj, setSortFieldsObj] = useState();
  const [statusField, setStatusField] = useState();
  const [companiesList, setCompaniesList] = useState([]);
  const { deleteContact } = useDeleteContact();

  // Function to handle deleting a contact
  const handleDelete = async (contactId) => {
    console.log("Call the delete api with id: ", contactId);
    await deleteContact(contactId);
    setReFetch((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    currentUser && (
      <div className="contacts-page">
        <div className="contacts-page-wrapper">
          <ContactsPageHeader
            onSortChange={handleSortChange}
            onStatusChange={handleStatusChange}
            onCompaniesChange={handleCompaniesChange}
          />
          <ContactsTable
            tableData={data}
            setTableData={setData}
            columnDef={columns}
            onDelete={handleDelete}
            sortFieldsObj={sortFieldsObj}
            statusField={statusField}
            companiesList={companiesList}
            reFetch={reFetch}
          />
        </div>
      </div>
    )
  );
};

export default Contactspage;
