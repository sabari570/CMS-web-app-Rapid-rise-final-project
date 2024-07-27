import React from "react";
import "./cmsCustomModal.styles.scss";

const CmsCustomModal = ({ isModalOpen, confirmDelete, cancelDelete }) => {
  return (
    <div
      className={`cms-custom-modal-overlay ${isModalOpen ? "modal-open" : ""}`}
    >
      <div
        className={`cms-custom-modal-wrapper ${
          isModalOpen ? "modal-wrapper-open" : ""
        }`}
      >
        <div className="modal-close-icon" onClick={cancelDelete}>
          x
        </div>

        <div className="modal-header">
          <p className="modal-header-heading">
            Are you sure you want to delete this contact?
          </p>
          <p className="modal-header-content">
            This action cannot be undone and you will lose all the information
            related to this contact!
          </p>
        </div>

        <div className="modal-footer">
          <button onClick={cancelDelete} className="cancel-btn">
            Cancel
          </button>
          <button onClick={confirmDelete} className="confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CmsCustomModal;
