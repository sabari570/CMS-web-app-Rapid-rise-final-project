import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer.js";
import { handleErrors } from "../utils/handleErrors";
import toast from "react-hot-toast";
import { setCurrentUser } from "../store/user/user.reducer";
import axiosInstance from "../services/interceptors";
import { setSelectedContact } from "../store/contact/contact.reducer";

function useUpdateContactDetail() {
  const dispatch = useDispatch();

  const updateContactDetail = async (contactId, contactData) => {
    dispatch(setIsLoading(true));
    try {
      dispatch(setSelectedContact(null));
      const response = await axiosInstance.patch(
        `/contacts/update-contact/${contactId}`,
        contactData
      );
      console.log("Response after updating contact details: ", response);
      const updatedContact = await response.data.contact;

      if (!updatedContact) {
        toast.error("Couldn't update contact avatar. Please try again later");
        return;
      }
      toast.success("Contact updated successfully");
      dispatch(setSelectedContact(updatedContact));
    } catch (error) {
      console.log("Error while updating contact detail: ", error);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
      if (error.response.status === 404) return;

      // If the token is invalid log the users out
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch(setCurrentUser(null));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { updateContactDetail };
}

export default useUpdateContactDetail;
