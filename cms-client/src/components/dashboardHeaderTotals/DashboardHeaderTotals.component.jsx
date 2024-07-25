import React from "react";
import "./dashboardHeaderTotals.styles.scss";
import { FaUsers } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";

const DashboardHeaderTotals = ({ totalsData }) => {
  console.log("Totals data: ", totalsData);
  const totalHeaderCards = [
    {
      title: "Total Contacts",
      value: totalsData.totalContacts,
      percentage: totalsData.percentangeChangeInContacts,
      icon: <FaUsers className="header-icons" />,
    },
    {
      title: "Total Employees",
      value: totalsData.totalEmployees,
      percentage: totalsData.percentageChangeInEmployees,
      icon: <FaUserTie className="header-icons" />,
    },
    {
      title: "Total Trainees",
      value: totalsData.totalTrainees,
      percentage: totalsData.percentageChangeInTrainees,
      icon: <FaUserGraduate className="header-icons" />,
    },
  ];
  return (
    <div className="dashboard-header-totals">
      <div className="dashboard-header-totals-wrapper">
        {totalHeaderCards.map((info, index) => {
          return (
            <div key={index} className="header-total-card">
              <div className="header-icons-wrapper">{info.icon}</div>
              <p className="card-title">{info.title}</p>
              <div className="card-statistics">
                <p>{info.value}</p>
                {info.percentage != null && (
                  <div className="percentage-div">
                    <span>{info.percentage}%</span>
                    {info.percentage > 0 ? (
                      <FaArrowUpLong className="positive" />
                    ) : (
                      <FaArrowDownLong className="negative" />
                    )}
                  </div>
                )}
              </div>
              {info.percentage != null && (
                <p className="card-footer">Compared to last month</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHeaderTotals;
