export const CMS_IMAGE_BASEURL = import.meta.env.VITE_CMS_IMAGE_BASEURL;

export const selectLabelCustomStyles = (isMobile) => ({
  control: (provided, state) => ({
    ...provided,
    fontSize: "0.8rem",
    backgroundColor: "#fff",
    boxShadow: state.isFocused ? "0 0 0 1px #007bff" : null,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#201658",
    "&:hover": {
      color: "#201658",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "0.8rem",
  }),
  multiValue: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isFocused ? "#6c757d" : "#201658",
      borderRadius: "1rem",
      padding: "0.2rem 0.5rem",
      cursor: "pointer",
    };
  },
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: "#fff",
    hover: {
      background: "#dc3545",
      color: "#fff",
      cursor: "pointer",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: "10rem",
    overflow: "auto",
    top: isMobile ? "0" : "",
    position: isMobile ? "relative" : "absolute",
  }),
  // Match the height of the menulist with the menu inorder to prevent breaking in UI
  menuList: (provided) => ({
    ...provided,
    maxHeight: "10rem",
    overflowY: "auto",
  }),
});

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const PIE_CHART_COLORS = [
  "#4423A5",
  "#54D4E4",
  "#8A2BE2",
  "#6495ED",
  "#00CED1",
  "#FF69B4",
  "#32CD32",
];
