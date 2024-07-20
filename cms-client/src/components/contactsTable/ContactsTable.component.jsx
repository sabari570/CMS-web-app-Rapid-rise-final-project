import React, { useEffect, useMemo, useState } from "react";
import "./contactsTable.styles.scss";
import ContactsSearchField from "../contactsSearchField/ContactsSearchField.component";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ContactsTablePagination from "../contactsTablePagination/ContactsTablePagination.component";
import ContactCard from "../contactCard/ContactCard.component";

const ContactsTable = ({
  tableData,
  columnDef,
  pageIndex,
  setPageIndex,
  onDelete,
  sortFieldsObj,
  statusField,
  companiesList,
}) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => columnDef(onDelete), [columnDef, onDelete]);
  const [contactsData, setContactsData] = useState([]);
  const [sorting, setSorting] = useState([sortFieldsObj]);
  const [statusSelected, setStatusSelected] = useState(statusField);
  const [companiesSelected, setCompaniesSelected] = useState(companiesList);
  const [searchFilter, setSearchFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    sortDescFirst: false,
    onSortingChange: setSorting,
    manualSorting: true,
  });

  useEffect(() => {
    setSorting(sortFieldsObj);
  }, [sortFieldsObj]);

  useEffect(() => {
    setCompaniesSelected(companiesList);
  }, [companiesList]);

  useEffect(() => {
    setStatusSelected(statusField);
  }, [statusField]);

  useEffect(() => {
    console.log({ sorting, statusSelected, companiesSelected });
  }, [sorting, statusSelected, companiesSelected]);
  return (
    <div className="contacts-table">
      <div className="contacts-table-wrapper">
        <ContactsSearchField
          value=""
          searchBoxClassName="contacts-table-wrapper-search-box"
          searchIconClassName="search-box-icon"
          placeholder="Search"
          type="text"
        />

        {/* CONTACTS TABLE */}
        <div className="contacts-table-wrapper-container">
          {data.length > 0 && (
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="table-header">
                        {header.isPlaceholder ? null : (
                          <div className="table-header-div">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* CONTACTS CARD */}
        <div className="contacts-table-wrapper-contacts-card">
          <div className="contact-card-wrapper">
            {data.map((contact, index) => (
              <ContactCard key={index} contact={contact} />
            ))}
          </div>
        </div>

        {/* TABLE PAGINATION */}
        <ContactsTablePagination pageCount={table.getPageCount()} />
      </div>
    </div>
  );
};

export default ContactsTable;
