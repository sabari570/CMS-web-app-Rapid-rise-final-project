import React from "react";
import "./dashboardContactsPieChart.styles.scss";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PIE_CHART_COLORS } from "../../constants/appConstants";
import useIsMobile from "../../hooks/useIsMobile.js";

const DashboardContactsPieChart = ({ contactsByCompanyData }) => {
  const isMobile = useIsMobile(650);
  console.log("Ismobile: ", isMobile);
  return (
    <div className="dashboard-contacts-pie-chart">
      <div className="dashboard-contacts-pie-chart-wrapper">
        <div className="pie-chart-heading">Contacts by company</div>
        <div className="pie-chart-wrapper">
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart width={400} height={400}>
                <Pie
                  data={contactsByCompanyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  innerRadius="60%"
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="companyName"
                  label={({ companyName }) => (isMobile ? null : companyName)}
                >
                  {contactsByCompanyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                {isMobile && <Legend />}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContactsPieChart;
