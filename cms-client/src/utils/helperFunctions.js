import { CMS_IMAGE_BASEURL, MONTH_NAMES } from "../constants/appConstants";

// Helper function to handle the image url from backend
export const handleImageUrl = (profilePicUrl) => {
  if (profilePicUrl.startsWith("http")) {
    return profilePicUrl;
  } else {
    return `${CMS_IMAGE_BASEURL + profilePicUrl}`;
  }
};

// Helper function to capitalize the string
export const capitalizeFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// Helper function to format the date string
// if targetted length is met then 0 will not be added in the begining
// else it gets added thats the functionality of padStart
// Eg: If month is "9", month.padStart(2, "0") will result in "09".
// If month is "10", it will remain "10" because it already meets the target length.
export const formatDateForInputField = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Helper function to format date when sent to backend
export const formatDateString = (dateString) => {
  const [year, month, date] = dateString.split("-");
  return `${date}/${month}/${year}`;
};

// Helper function to modify the graph data and display it
export const formatContactsGraphData = (data) => {
  const allMonths = MONTH_NAMES.map((month) => ({
    month: month,
    count: 0,
  }));

  data.forEach(({ count, month }) => {
    const monthIndex = month - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      allMonths[monthIndex].count = count;
    }
  });

  return allMonths;
};

// Helper function to format phone numbers in frontend
export const formattedPhoneNumbersField = (data) => {
  if (!data || data.length === 0) return [];
  return data;
};
