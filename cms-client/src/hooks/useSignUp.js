import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/loading/loading.reducer";
import toast from "react-hot-toast";
import axiosInstance from "../services/interceptors";
import { handleErrors } from "../utils/handleErrors";

function useSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async (userFormData) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.post("/auth/register", userFormData);
      const newUser = await response.data.user;
      console.log(newUser);

      if (!newUser) {
        toast.error("Couldn't register user. Please try again later");
        return;
      }

      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log("Error while registering user: ", error.response.data);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { signUp };
}

export default useSignUp;
