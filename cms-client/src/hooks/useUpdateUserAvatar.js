import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../services/interceptors";
import { handleErrors } from "../utils/handleErrors.js";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/user/user.reducer.js";

function useUpdateUserAvatar() {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const updateUserAvatar = async (userUpdatedAvatar) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch(
        `/users/change-user-avatar`,
        userUpdatedAvatar
      );
      console.log("Response after updating user avatar: ", response);
      const updatedUser = await response.data.user;

      if (!updatedUser) {
        toast.error("Couldn't update user avatar. Please try again later");
        return;
      }
      toast.success("User avatar updated successfully");
      dispatch(setCurrentUser(updatedUser));
    } catch (error) {
      console.log("Error while updating user avatar: ", error);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
      if (error.response.status === 404) return;

      // If the token is invalid log the users out
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch(setCurrentUser(null));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { loading, updateUserAvatar };
}

export default useUpdateUserAvatar;
