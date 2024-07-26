import React, { useEffect, useState } from "react";
import "./homepage.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";
import DashboardHeaderTotals from "../../components/dashboardHeaderTotals/DashboardHeaderTotals.component";
import DashboardContactsGraph from "../../components/dashboardContactsGraph/DashboardContactsGraph.component";
import DashboardRecentContacts from "../../components/dashboardRecentContacts/DashboardRecentContacts.component";
import DashboardContactsPieChart from "../../components/dashboardContactsPieChart/DashboardContactsPieChart.component";
import useFetchDashboardData from "../../hooks/useFetchDashboardData";
import useFetchUserDetail from "../../hooks/useFetchUserDetail.js";
import { setCurrentUser } from "../../store/user/user.reducer.js";

const Homepage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchDashboardData } = useFetchDashboardData();
  const { fetchUserDetail } = useFetchUserDetail();
  const [totalsData, setTotalsData] = useState();
  const [contactsPerMonth, setContactsPerMonth] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [contactsByCompanyData, setContactsByCompanyData] = useState([]);

  useEffect(() => {
    console.log("Current user details: ", currentUser);
    if (!currentUser) navigate("/login");
  }, [currentUser]);

  const handleDashboardFetch = async () => {
    const response = await fetchDashboardData();
    setTotalsData(response.dashboardData?.totals);
    setContactsPerMonth(response.dashboardData?.contactsPerMonth);
    setRecentContacts(response.dashboardData?.recentContacts);
    setContactsByCompanyData(response.dashboardData?.contactsByCompany);
  };

  const handleFetchUserDetail = async () => {
    const response = await fetchUserDetail();
    if (response) dispatch(setCurrentUser(response));
  };

  useEffect(() => {
    handleFetchUserDetail();
    handleDashboardFetch();
  }, []);

  return (
    currentUser && (
      <div className="homepage">
        <div className="homepage-wrapper">
          <div className="dashboard-heading">
            <p>Welcome Back,</p>
            <p>{`${currentUser?.firstName} ${
              currentUser?.lastName !== undefined ? currentUser?.lastName : ""
            }`}</p>
          </div>
          {totalsData && <DashboardHeaderTotals totalsData={totalsData} />}
          {contactsPerMonth.length > 0 && (
            <DashboardContactsGraph contactsPerMonth={contactsPerMonth} grid />
          )}
          <div className="dashboard-footer-data">
            {recentContacts.length > 0 && (
              <DashboardRecentContacts recentContacts={recentContacts} />
            )}
            {contactsByCompanyData.length > 0 && (
              <DashboardContactsPieChart
                contactsByCompanyData={contactsByCompanyData}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Homepage;
