import React from "react";
import "./dashboardContactsGraph.styles.scss";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { formatContactsGraphData } from "../../utils/helperFunctions";
import useIsMobile from "../../hooks/useIsMobile";

const DashboardContactsGraph = ({ contactsPerMonth, grid }) => {
  const formattedData = formatContactsGraphData(contactsPerMonth);
  const isMobile = useIsMobile(650);
  return (
    <div className="dashboard-contacts-graph">
      <div className="dashboard-contacts-graph-wrapper">
        <div className="graph-title">Contacts Analytics</div>
        <div className="line-graph">
          <ResponsiveContainer width="100%" aspect={isMobile ? 4 / 3 : 4 / 1}>
            <LineChart data={formattedData}>
              <XAxis dataKey="month" stroke="#5550bd" />
              <Line type="monotone" dataKey="count" stroke="#5550bd" />
              <Tooltip />
              <Legend />
              {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5" />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContactsGraph;
