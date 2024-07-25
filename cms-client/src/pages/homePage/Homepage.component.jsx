import React, { useEffect, useState } from "react";
import "./homepage.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import DashboardHeaderTotals from "../../components/dashboardHeaderTotals/DashboardHeaderTotals.component";
import DashboardContactsGraph from "../../components/dashboardContactsGraph/DashboardContactsGraph.component";
import DashboardRecentContacts from "../../components/dashboardRecentContacts/DashboardRecentContacts.component";
import DashboardContactsPieChart from "../../components/dashboardContactsPieChart/DashboardContactsPieChart.component";

const Homepage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [totalsData, setTotalsData] = useState();
  const [contactsPerMonth, setContactsPerMonth] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [contactsByCompanyData, setContactsByCompanyData] = useState([]);

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  useEffect(() => {
    setTotalsData({
      totalContacts: 28,
      percentangeChangeInContacts: 85,
      totalCompanies: 7,
      totalEmployees: 17,
      percentageChangeInEmployees: 76,
      totalTrainees: 11,
      percentageChangeInTrainees: 0,
    });

    setContactsPerMonth([
      {
        count: 2,
        month: 6,
      },
      {
        count: 26,
        month: 7,
      },
    ]);

    setRecentContacts([
      {
        _id: "66a0b6af29ee52d21bc57569",
        firstName: "Kevin",
        lastName: "Doe",
        address: "HAL, Bangalore - 560017",
        companyName: "Amazon",
        status: "Employee",
        phone: "+1 9123248384",
        adminId: "668e36d6be3d0c4642ba13d9",
        profilePic: "1721808584083-avatar8.jpg",
      },
      {
        _id: "669e7325e676261f321fe3d0",
        firstName: "Muzan",
        lastName: "Kibutsuji",
        address: "Infinity castle",
        companyName: "Flipkart",
        status: "Employee",
        phone: "+93 8493493493",
        adminId: "668e36d6be3d0c4642ba13d9",
        profilePic: "1721660197588-muzan.jpg",
      },
      {
        _id: "669e728ce676261f321fe3a1",
        firstName: "Tanjiro",
        lastName: "Kamado",
        address: "Yelahanka old town, Bangalore - 397465",
        companyName: "Innovature",
        status: "Employee",
        phone: "+98 2343943433",
        adminId: "668e36d6be3d0c4642ba13d9",
        profilePic: "1721761324932-tanjiro-kamado-3840x2160-9320.jpg",
      },
      {
        _id: "669e58e9e676261f321fe382",
        firstName: "Test",
        lastName: "lastname",
        address: "test address, kochi",
        companyName: "Facebook",
        status: "Employee",
        phone: "+91 9803134203",
        adminId: "668e36d6be3d0c4642ba13d9",
        profilePic: "default-profile-pic.png",
      },
      {
        _id: "669e56d7055bf6177e36ad2c",
        firstName: "Test",
        lastName: "lastname",
        address: "test address, kochi",
        companyName: "Facebook",
        status: "Trainee",
        phone: "+91 9219932337",
        adminId: "668e36d6be3d0c4642ba13d9",
        profilePic: "1721653028003-avatar2.jpg",
      },
    ]);
    setContactsByCompanyData([
      {
        count: 1,
        companyName: "Zoho",
      },
      {
        count: 1,
        companyName: "Accenture",
      },
      {
        count: 18,
        companyName: "Amazon",
      },
      {
        count: 2,
        companyName: "Facebook",
      },
      {
        count: 1,
        companyName: "Innovature",
      },
      {
        count: 3,
        companyName: "Flipkart",
      },
      {
        count: 2,
        companyName: "Google",
      },
    ]);
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-wrapper">
        <div className="dashboard-heading">
          <p>
            Welcome Back {`${currentUser.firstName} ${currentUser.lastName}`}
          </p>
        </div>
        {totalsData && <DashboardHeaderTotals totalsData={totalsData} />}
        {contactsPerMonth && (
          <DashboardContactsGraph contactsPerMonth={contactsPerMonth} grid />
        )}
        <div className="dashboard-footer-data">
          {recentContacts && (
            <DashboardRecentContacts recentContacts={recentContacts} />
          )}
          {contactsByCompanyData && (
            <DashboardContactsPieChart
              contactsByCompanyData={contactsByCompanyData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
