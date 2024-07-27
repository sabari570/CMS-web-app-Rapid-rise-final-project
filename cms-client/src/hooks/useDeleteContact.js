import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/loading/loading.reducer";
import { handleErrors } from "../utils/handleErrors";
import toast from "react-hot-toast";
import axiosInstance from "../services/interceptors";

function useDeleteContact() {
  const dispatch = useDispatch();

  const deleteContact = async (contactId) => {
    try {
      const response = await axiosInstance.delete(
        `/contacts/delete-contact/${contactId}`
      );
      const deleteResponse = await response.data.message;
      if (deleteResponse) toast.success("Contact deleted successfully");
    } catch (error) {
      console.log("Error while deleting a contact: ", error);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
    } 
  };

  return { deleteContact };
}

export default useDeleteContact;
