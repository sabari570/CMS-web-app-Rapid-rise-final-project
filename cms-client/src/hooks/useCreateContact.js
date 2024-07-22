import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/loading/loading.reducer";
import { handleErrors } from "../utils/handleErrors";
import toast from "react-hot-toast";
import axiosInstance from "../services/interceptors";

function useCreateContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createContact = async (contactFormData) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.post(
        "/contacts/create-contact",
        contactFormData
      );
      const newContact = await response.data.contact;

      if (!newContact) {
        toast.error("Couldn't create a new contact. Please try again later");
        return;
      }
      toast.success("Contact created successfully");
      navigate("/contacts");
    } catch (error) {
      console.log("Error while creating a contact: ", error);
      const errorMessage = handleErrors(error.response.data.errors.message);
      toast.error(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { createContact };
}

export default useCreateContact;
