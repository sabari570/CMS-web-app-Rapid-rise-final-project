import React, { useMemo, useState } from "react";
import "./contactsTable.styles.scss";
import ContactsSearchField from "../contactsSearchField/ContactsSearchField.component";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const ContactsTable = ({
  tableData,
  columnDef,
  pageIndex,
  setPageIndex,
  onDelete,
}) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => columnDef, [columnDef]);
  const [contactsData, setContactsData] = useState([]);
  const [sorting, setSorting] = useState();
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
  });
  const totalPages = table.getPageCount();

  console.log({ data, totalPages });

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
      </div>
    </div>
  );
};

export default ContactsTable;
