import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/loading/loading.reducer";
import axiosInstance from "../services/interceptors";
import { handleErrors } from "../utils/handleErrors";
import toast from "react-hot-toast";

function useResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPassword = async (passwordData, userId, token) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${userId}/${token}`,
        passwordData
      );
      console.log("Response after resetting password: ", response.data);
      if (response.status == 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error in reset password: ", error.response.data);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
      navigate("/login");
    }
  };

  return { resetPassword };
}

export default useResetPassword;
