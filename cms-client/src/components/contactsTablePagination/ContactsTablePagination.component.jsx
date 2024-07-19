import React from "react";
import "./contactsTablePagination.styles.scss";
import ReactPaginate from "react-paginate";

const ContactsTablePagination = ({ pageCount, handlePageClick }) => {
  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination-wrapper-container"
        activeClassName="pagination-active"
        previousClassName="page-item"
        nextClassName="page-item"
        pageClassName="page-item"
        breakClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
      />
    </div>
  );
};

export default ContactsTablePagination;
