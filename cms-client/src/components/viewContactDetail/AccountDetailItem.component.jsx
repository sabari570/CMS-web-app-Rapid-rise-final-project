import React from "react";

const AccountDetailItem = ({ detailHeading, detailItems }) => {
  return (
    <div className="contact-account-details">
      <div className="account-details-heading">{detailHeading}</div>
      {detailItems.map((item, index) => (
        <div key={index} className="account-details-item">
          {item.icon}
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default AccountDetailItem;
