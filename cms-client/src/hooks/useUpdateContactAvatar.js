import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../services/interceptors";
import { handleErrors } from "../utils/handleErrors.js";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../store/contact/contact.reducer.js";
import { setCurrentUser } from "../store/user/user.reducer.js";

function useUpdateContactAvatar() {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const updateContactAvatar = async (contactId, contactUpdatedAvatar) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch(
        `/contacts/change-contact-avatar/${contactId}`,
        contactUpdatedAvatar
      );
      console.log("Response after updating contact avatar: ", response);
      const updatedContact = await response.data.contact;

      if (!updatedContact) {
        toast.error("Couldn't update contact avatar. Please try again later");
        return;
      }
      toast.success("Contact updated successfully");
      dispatch(setSelectedContact(updatedContact));
    } catch (error) {
      console.log("Error while updating contact avatar: ", error);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
      if (error.response.status === 404) return;

      // If the token is invalid log the users out
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch(setCurrentUser(null));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { loading, updateContactAvatar };
}

export default useUpdateContactAvatar;
