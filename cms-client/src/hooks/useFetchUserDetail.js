import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer.js";
import axiosInstance from "../services/interceptors.js";
import { handleErrors } from "../utils/handleErrors.js";
import { setCurrentUser } from "../store/user/user.reducer.js";
import toast from "react-hot-toast";

function useFetchUserDetail() {
  const dispatch = useDispatch();
  const fetchUserDetail = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(`/users/fetch-user-profile`);
      const fetchedData = (await response.data?.userDetail) || null;
      if (!fetchedData) {
        toast.error("Couldn't fetch user details. Please try again later");
      }
      console.log("Fetched user response: ", fetchedData);
      return fetchedData;
    } catch (error) {
      console.log("Error while fetching contacts: ", error.response.data);
      const errorMessage = handleErrors(error.response.data.errors.message);
      if (error.response.status === 404) return;

      // If the token is invalid log the users out
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch(setCurrentUser(null));
      }
    }
  };

  return { fetchUserDetail };
}

export default useFetchUserDetail;
