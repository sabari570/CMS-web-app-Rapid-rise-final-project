import { CMS_IMAGE_BASEURL } from "../constants/appConstants";

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
