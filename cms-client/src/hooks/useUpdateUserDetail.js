import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/loading/loading.reducer.js";
import { handleErrors } from "../utils/handleErrors";
import toast from "react-hot-toast";
import { setCurrentUser } from "../store/user/user.reducer";
import axiosInstance from "../services/interceptors";
import { setSelectedContact } from "../store/contact/contact.reducer";

function useUpdateUserDetail() {
  const dispatch = useDispatch();

  const updateUserDetail = async (userData) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.patch(
        `/users/update-user-profile/`,
        userData
      );
      console.log("Response after updating user details: ", response);
      const updatedUser = await response.data.user;

      if (!updatedUser) {
        toast.error("Couldn't update user details. Please try again later");
        return;
      }
      toast.success("User updated successfully");
      dispatch(setCurrentUser(updatedUser));
      return updatedUser;
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

  return { updateUserDetail };
}

export default useUpdateUserDetail;
