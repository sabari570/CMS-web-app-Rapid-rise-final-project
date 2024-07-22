import React from "react";

const CmsDropdownItem = ({ onClick, children }) => {
  return (
    <div className="cms-dropdown-item" onClick={onClick}>
      {children}
    </div>
  );
};

export default CmsDropdownItem;
