import { CMS_IMAGE_BASEURL } from "../constants/appConstants";

export const handleImageUrl = (profilePicUrl) => {
  if (profilePicUrl.startsWith("http")) {
    return profilePicUrl;
  } else {
    return `${CMS_IMAGE_BASEURL + profilePicUrl}`;
  }
};
