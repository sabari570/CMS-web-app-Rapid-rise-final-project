import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/loading/loading.reducer";
import { setCurrentUser } from "../store/user/user.reducer.js";
import toast from "react-hot-toast";
import axiosInstance from "../services/interceptors";
import { handleErrors } from "../utils/handleErrors";

function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userData) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      const user = await response.data.user;
      console.log({ user });

      if (!user) {
        toast.error("Couldn't login user. Please try again later");
        return;
      }

      dispatch(setCurrentUser(user));
      toast.success("User logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error while logging in: ", error.response.data);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { login };
}

export default useLogin;
