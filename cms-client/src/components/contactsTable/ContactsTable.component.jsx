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
import useFetchContacts from "../../hooks/useFetchContacts";
import NoRecordsImage from "../noRecordsImage/NoRecordsImage.component";
import RecordsNotFoundImage from "../../assets/no-records.jpg";
import TableLimitDropdown from "../tableLimitDropdown/TableLimitDropdown.component";

const ContactsTable = ({
  tableData,
  setTableData,
  columnDef,
  onDelete,
  sortFieldsObj,
  statusField,
  companiesList,
  reFetch,
}) => {
  const data = useMemo(() => tableData.contacts ?? [], [tableData]);
  const columns = useMemo(() => columnDef(onDelete), [columnDef, onDelete]);
  const [sorting, setSorting] = useState([sortFieldsObj]);
  const [statusSelected, setStatusSelected] = useState(statusField);
  const [companiesSelected, setCompaniesSelected] = useState(companiesList);
  const [searchFilter, setSearchFilter] = useState("");
  const { fetchContacts } = useFetchContacts();
  const [defaultPage, setDefaultPage] = useState(0);

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
      pagination,
      searchFilter,
    },
    sortDescFirst: false,
    onSortingChange: setSorting,
    manualSorting: true,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: tableData.totalPages ?? 0,
    manualFiltering: true,
    onGlobalFilterChange: setSearchFilter,
  });

  const handlePageClick = (event) => {
    const newPageIndex = event.selected;
    setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
  };

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
    handleFetchTableData();
    setDefaultPage(pagination.pageIndex);
  }, [pagination]);

  const handleFetchTableData = async () => {
    const sort = sorting != undefined && `${sorting.id}:${sorting.type}`;
    const companies = companiesSelected
      .map((company) => company.value)
      .join(",");
    const params = {
      search: searchFilter,
      sort,
      status: statusSelected,
      companies,
      page: table.getState().pagination.pageIndex + 1,
      limit: table.getState().pagination.pageSize,
    };
    const tableResponse = await fetchContacts(params);
    setTableData(tableResponse);

    if (table.getState().pagination.pageIndex > tableResponse.page) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [searchFilter, statusSelected, companiesSelected]);

  useEffect(() => {
    handleFetchTableData();
    console.log({
      sorting,
      statusSelected,
      companiesSelected,
      searchFilter,
      pagination,
    });
  }, [sorting, statusSelected, companiesSelected, searchFilter, reFetch]);

  return (
    <div className="contacts-table">
      <div className="contacts-table-wrapper">
        <div className="table-footer-options">
          <ContactsSearchField
            value={searchFilter ?? ""}
            searchBoxClassName="contacts-table-wrapper-search-box"
            searchIconClassName="search-box-icon"
            placeholder="Search all columns..."
            type="text"
            onChange={(value) => setSearchFilter(String(value))}
          />

          <TableLimitDropdown
            limitLabel="Contacts per page"
            limitValue={pagination.pageSize}
            setLimit={(value) =>
              setPagination((prev) => ({ ...prev, pageSize: value }))
            }
          />
        </div>

        {/* CONTACTS TABLE */}
        <div className="contacts-table-wrapper-container">
          {data.length > 0 ? (
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
          ) : (
            <div className="empty-table-message">
              <NoRecordsImage
                bgImage={RecordsNotFoundImage}
                message={"No records found"}
                subMessage={"Adjust your filters and Try again"}
              />
            </div>
          )}
        </div>

        {/* CONTACTS CARD */}
        <div className="contacts-table-wrapper-contacts-card">
          {data.length > 0 ? (
            <div className="contact-card-wrapper">
              {data.map((contact, index) => (
                <ContactCard
                  key={index}
                  contact={contact}
                  onDelete={onDelete}
                />
              ))}
            </div>
          ) : (
            <div className="empty-table-message">
              <NoRecordsImage
                bgImage={RecordsNotFoundImage}
                message={"No records found"}
                subMessage={"Adjust your filters and Try again"}
              />
            </div>
          )}
        </div>

        {/* TABLE PAGINATION */}
        <ContactsTablePagination
          defaultPageIndex={defaultPage}
          pageCount={table.getPageCount()}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default ContactsTable;
