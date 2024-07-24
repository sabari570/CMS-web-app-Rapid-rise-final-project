import { useDispatch } from "react-redux";
import axiosInstance from "../services/interceptors";
import toast from "react-hot-toast";
import { setIsLoading } from "../store/loading/loading.reducer";
import { setCurrentUser } from "../store/user/user.reducer.js";

function useLogout() {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(`/auth/logout`);
      console.log("Response after logging out user: ", response.data);
      dispatch(setCurrentUser(null));
      toast.success("User logged out successfully");
    } catch (error) {
      console.log("Error while logging out: ", error.response);
      dispatch(setCurrentUser(null));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { logout };
}

export default useLogout;
