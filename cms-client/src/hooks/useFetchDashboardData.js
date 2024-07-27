import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer";
import { handleErrors } from "../utils/handleErrors";
import axiosInstance from "../services/interceptors";
import toast from "react-hot-toast";

function useFetchDashboardData() {
  const dispatch = useDispatch();

  const fetchDashboardData = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get("/users/dashboard-data");
      console.log("Response for dashboard fetch: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error while fetching dashboard data: ", error.response.data);
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

  return { fetchDashboardData };
}

export default useFetchDashboardData;
