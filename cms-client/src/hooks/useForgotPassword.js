import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer";
import axiosInstance from "../services/interceptors";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleErrors } from "../utils/handleErrors";

function useForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotPassword = async (emailData) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.post(
        "/auth/forgot-password",
        emailData
      );
      console.log("Response after sending forgot password: ", response.data);
      if (response.status == 200) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in forgot password: ", error.response.data);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { forgotPassword };
}

export default useForgotPassword;
