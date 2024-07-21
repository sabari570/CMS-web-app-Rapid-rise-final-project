import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer";
import { handleErrors } from "../utils/handleErrors";
import { setCurrentUser } from "../store/user/user.reducer";
import axiosInstance from "../services/interceptors";

function useFetchCompaniesList() {
  const dispatch = useDispatch();

  const fetchCompanies = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get("/contacts/fetch-companies/");
      return response.data;
    } catch (error) {
      console.log("Error while fetching companies: ", error.response.data);
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
  return { fetchCompanies };
}

export default useFetchCompaniesList;
