import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer";
import axiosInstance from "../services/interceptors";
import { handleErrors } from "../utils/handleErrors";
import { setCurrentUser } from "../store/user/user.reducer.js";
import toast from "react-hot-toast";
import { setSelectedContact } from "../store/contact/contact.reducer.js";

function useFetchContactDetail() {
  const dispatch = useDispatch();
  const fetchContactDetail = async (contactId) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(
        `/contacts/fetch-contact/${contactId}`
      );
      const fetchedData = (await response.data?.contact[0]) || null;
      if (!fetchedData) {
        toast.error("Couldn't fetch contact details. Please try again later");
      }
      console.log("Fetched contact response: ", fetchedData);
      dispatch(setSelectedContact(fetchedData));
    } catch (error) {
      console.log("Error while fetching contacts: ", error.response.data);
      const errorMessage = handleErrors(error.response.data.errors.message);
      if (error.response.status === 404) return;

      // If the token is invalid log the users out
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch(setCurrentUser(null));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { fetchContactDetail };
}

export default useFetchContactDetail;
