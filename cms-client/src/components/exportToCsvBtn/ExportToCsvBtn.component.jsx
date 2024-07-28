import React from "react";
import "./exportToCsvBtn.styles.scss";
import toast from "react-hot-toast";
import { Parser } from "@json2csv/plainjs/index.js";
import { FIELDS_TO_EXPORT } from "../../constants/appConstants";
import { FaFileCsv } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import useIsMobile from "../../hooks/useIsMobile";

const ExportToCsvBtn = ({ data, fileName = "contacts.csv" }) => {
  const isMobile = useIsMobile(650);
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast.error("No data available for export.");
      return;
    }

    const parser = new Parser({ fields: FIELDS_TO_EXPORT });
    const csv = parser.parse(data);

    // Creating a blob and triggering the download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log("data for exporting: ", data);
  return (
    <div className="export-to-csv-btn">
      <button onClick={handleExport}>
        <span className="btn-text">Export to CSV</span>
        {isMobile ? (
          <FaDownload className="export-icon" />
        ) : (
          <FaFileCsv className="export-icon" />
        )}
      </button>
    </div>
  );
};

export default ExportToCsvBtn;
